import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { Subscription } from 'rxjs';
import { Office } from '../../model/office';
import { SchemaTemplate } from '../../model/schema-template';
import { WorkpackTemplate } from '../../model/workpack-template';
import { Useful } from '../../useful';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { FormControl, Validators, FormArray } from '@angular/forms';
import { Property } from '../../model/property';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';


@Component({
  selector: 'app-workpack-template',
  templateUrl: './workpack-template.component.html',
  styleUrls: ['./workpack-template.component.css']
})

@NgModule({
})

export class WorkpackTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private workpackDataService: WorkpackDataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService) {
    }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  shortNameFormControl = new FormControl('', [
    Validators.required
  ]);    

  propertyFormControls: {
    name: FormControl;
    min: FormControl;
    max: FormControl;
  }[] = [];


  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  workpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  parentWorkpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  viewOptions: ViewOptions = new ViewOptions();
  siblings: WorkpackTemplate[] = [];
  tpTree: WorkpackTemplate = new WorkpackTemplate();
  flatTree: {
    ident: number;
    id: String;
    label: String; 
  }[];
  propertyTypes: Property[] = [];
  
  propertyListView: {
    property: Property;
    toDelete: Boolean;
    editing: Boolean;
  }[] = [];


  ngOnInit() {

    this.viewOptions = this.route.snapshot.data.workpacktemplate;

    this.subscriptions.push(
      this.workpackDataService.workpackTemplate.subscribe(wpt =>{
        this.workpackTemplate = wpt;
        this.propertyListView = [];
        this.workpackTemplate.properties.forEach(property => {
          this.propertyListView.push({
            'property': property,
            'toDelete': false,
            'editing': false
          });
          this.propertyFormControls.push({
            'name': new FormControl('', [
              Validators.required
            ]),
            'min': null,
            'max': null
          });
        });
        console.log('this.propertyListView', this.propertyListView);
        console.log('this.propertyFormControls', this.propertyFormControls);
      })
    );

    this.subscriptions.push(
      this.workpackDataService.workpackTemplateTree
      .subscribe(tree => {
        this.flatTree = [];
        this.FlattenTree(tree,1);
      })
    );

    this.subscriptions.push(
      this.schemaDataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    this.subscriptions.push(
      this.workpackDataService.propertyTypes.subscribe(pt =>{
        this.propertyTypes = pt.sort((a,b) => {
          return (a.typeName < b.typeName) ? -1 : 1; 
        });
      })
    );
  }

  FlattenTree(root: WorkpackTemplate, ident: number){
    root.components.forEach(template => {
      if (this.flatTree.findIndex(item => {
        return (item.id == template.id);
      }) == -1) {
        this.flatTree.push({
          id: template.id,
          ident: ident,
          label: '&nbsp;&nbsp;'.repeat(ident) + template.name
        });
        this.FlattenTree(template, ident+1);
      }
    });
  }

  ReuseTemplate(id: String) {
    let template2Reuse = new WorkpackTemplate();
    template2Reuse.id = id;
    this.workpackTemplate.components.push(template2Reuse);
    this.workpackDataService
      .UpdateWorkpackTemplate(this.workpackTemplate)
      .subscribe(() => {
        this.viewOptions.action = 'edit';
        this.router.navigate([
          './workpacktemplate/'+ this.viewOptions.action + 
          '/' + this.workpackTemplate.id]);
      });
  }


  GetPropertyLogo(type: String): {source: String, set: String, icon: String} {
    let code4TypeNotFound = {
      'source': 'mat-icon',
      'set': 'fas',
      'icon': 'fa-question'
    }
    let logoHTMLMap: {
      type:String;
      target: {source: String, set: String, icon: String};
    }[] = [
      {'type':'Number',     'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-hashtag'}},
      {'type':'Text',       'target':{'source': 'font',    'set': '',   'icon': 'T'}},
      {'type':'Cost',       'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-dollar-sign'}},
      {'type':'Measure',    'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-tachometer-alt'}},
      {'type':'TextList',   'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-list'}},
      {'type':'Address',    'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-envelope'}},
      {'type':'Email',      'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-at'}},
      {'type':'NumberList', 'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-sort-numeric-down'}},
    ];
    let typeFound = logoHTMLMap.find(elem => elem.type == type);
    return (typeFound) ? typeFound.target : code4TypeNotFound;
  }


  AddProperty(type: String) {
    let newProperty = new Property();
    newProperty.typeName = type;
    this.propertyListView.push({
      'property': newProperty,
      'toDelete': false,
      'editing': true
    });
    this.propertyFormControls.push({
      'name': new FormControl('', [
        Validators.required
      ]),
      'min': null,
      'max': null
    });
  }

  EditProperty(index) {
    this.propertyListView[index].editing = true;
  }

  StopEditing(index) {
    this.propertyListView[index].editing = false;
  }

  DeleteProperty(index) {

    if (!this.propertyListView[index].property.id) {
      this.propertyListView.splice(index,1);
    }
    else {
      this.propertyListView[index].toDelete = true;
    }

    console.log('this.currentProperties', this.propertyListView);
  }

  SetTrimmedNameAndShortName(value: String){
    this.workpackTemplate.name = this.useful.GetTrimmedName(value);
    this.workpackTemplate.shortName = this.useful.GetShortName(this.workpackTemplate.name);
  }

  UpdatePropertiesArray() {
    this.propertyListView.forEach((elem, index) => {
      if (elem.toDelete) {
        //this.propertyDataService.DeleteProperty(elem.property.id);
      }
    });
    this.workpackTemplate.properties = [];
    this.propertyListView
      .filter(elem => !elem.toDelete)
      .forEach (elem => this.workpackTemplate.properties.push(elem.property));
  }

  onSubmit(){
    this.workpackTemplate.name = this.workpackTemplate.name.trim();
    this.workpackTemplate.shortName = this.useful.GetShortName(this.workpackTemplate.shortName);

    this.UpdatePropertiesArray();

    switch (this.viewOptions.action) {
      case 'new2schematemplate': {
        this.schemaTemplate.workpackTemplates.push(this.workpackTemplate);
        this.subscriptions.push(
          this.schemaDataService
          .UpdateSchemaTemplate(this.schemaTemplate)
          .subscribe(
            () => {
              this.router.navigate([
                './schematemplate/edit/' + this.schemaTemplate.id]);
            }
          )
        );
        break;
      }
      case 'new2workpacktemplate': {
        this.subscriptions.push(
          this.workpackDataService.GetWorkpackTemplateById(this.viewOptions.arrIds[0])
          .subscribe(parentWPT => {
            parentWPT.components.push(this.workpackTemplate);
            this.subscriptions.push(
              this.workpackDataService
              .UpdateWorkpackTemplate(parentWPT)
              .subscribe(
                () => {
                  this.router.navigate([
                    './workpacktemplate/edit/' + parentWPT.id]);
                }
              )
            );
          })
        );
        break;
      }
      case 'edit': {
        console.log('this.workpackTemplate',this.workpackTemplate);
        this.subscriptions.push(
          this.workpackDataService
          .UpdateWorkpackTemplate(this.workpackTemplate)
          .subscribe(
            () => {
              let lastCrumb = this.crumbService.GetLast();
              this.router.navigate([
                './' + lastCrumb.route +
                '/' + lastCrumb.action +
                '/' + lastCrumb.id]);
            }
          )
        );
      }
    }
  }

  DeleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete " + 
                workpackTemplate2delete.name + 
                " because it contains workpacks.")
        }
        else if(confirm("Are you sure you want to delete " + workpackTemplate2delete.name + "?")) {
          this.workpackDataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.subscriptions
              .push(this.workpackDataService.QueryWorkpackTemplateById(this.workpackTemplate.id)
                .subscribe(wpt => wpt));
            }
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
