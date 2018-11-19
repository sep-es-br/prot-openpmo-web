import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { Subscription } from 'rxjs';
import { Office } from '../../model/office';
import { SchemaTemplate } from '../../model/schema-template';
import { WorkpackTemplate } from '../../model/workpack-template';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { PropertyProfile } from '../../model/property-profile';
import { TranslateConstants } from '../../model/translate';

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
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) {
    }

  //Constants for translate
  translate = new TranslateConstants();

  formGroupWorkpackTemplate = this.fb.group({
    id: [''],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    properties: this.fb.array([]),
  });

  color = 'primary';

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
  propertyTypes: String[] = [];
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  ngOnInit() {

    this.viewOptions = this.route.snapshot.data.workpacktemplate;

    this.subscriptions.push(
      this.workpackDataService.workpackTemplate.subscribe(wpt =>{
        this.workpackTemplate = wpt;
        if (this.workpackTemplate.id != '') {
          this.LoadFormControls();
        }
      })
    );
   
    this.HideMessage();

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
          return (a < b) ? -1 : 1; 
        });
      })
    );


    this.subscriptions.push(    
      this.formGroupWorkpackTemplate.statusChanges.subscribe((status) => {
        if (this.workpackTemplate.properties === undefined) return this.HideSaveButton();
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupWorkpackTemplate.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );     

  }

  CleanPropertiesFormArrays(){
    let ctrl = <FormArray>this.formGroupWorkpackTemplate.controls['properties'];
    while (this.formGroupWorkpackTemplate.controls['properties'].value.length !== 0) {
      ctrl.removeAt(0);
    }
  }

  LoadFormControls() {
    this.formGroupWorkpackTemplate.controls['name'].setValue(this.workpackTemplate.name);
    this.CleanPropertiesFormArrays();
    if (this.workpackTemplate.properties !== undefined) {
      this.workpackTemplate.properties
        .sort((a,b) => {
          return (a.sortIndex < b.sortIndex) ? -1 : 1;
        })
        .forEach(property => {
        (this.formGroupWorkpackTemplate.get('properties') as FormArray).push(
          this.fb.group({
            toDelete: [false],
            editing: [false],
            id: [property.id],
            name: [property.name, Validators.required],
            type: [property.type],
            using: [property.using],
            sortIndex: [property.sortIndex],
            value: [property.value],
            min: [property.min],
            max: [property.max],
            custom: [property.custom],
            possibleValues: [property.possibleValues],
            label: [property.label],
            rows: [property.rows],
            fullLine: [property.fullLine]
          })
        );
      });

    }
    console.log('this.formGroupWorkpackTemplate', this.formGroupWorkpackTemplate);
  }


  UserChangedSomething(val): Boolean {
    if (val.name != this.workpackTemplate.name) return true;
    if (val.properties.length != this.workpackTemplate.properties.length) return true;
    let changed = false;
    if (val.properties !== undefined) {
      val.properties.forEach((prop, i) => {
        if (prop.id == '') changed = true;
        if (prop.toDelete) changed = true;
        if (this.PropertyChanged(prop)) changed = true;
      });
    }
    return changed;
  }

  PropertyChanged(prop): Boolean {
    let foundIndex = this.workpackTemplate.properties.findIndex(p => p.name == prop.name);
    return (
      (foundIndex == -1) ||
      (this.workpackTemplate.properties[foundIndex].custom != prop.custom) ||
      (this.workpackTemplate.properties[foundIndex].max != prop.max)  ||
      (this.workpackTemplate.properties[foundIndex].min != prop.min)  ||
      (this.workpackTemplate.properties[foundIndex].name != prop.name)  ||
      (this.workpackTemplate.properties[foundIndex].possibleValues != prop.possibleValues) ||
      (this.workpackTemplate.properties[foundIndex].sortIndex != prop.sortIndex) ||
      (this.workpackTemplate.properties[foundIndex].type != prop.type) ||
      (this.workpackTemplate.properties[foundIndex].using != prop.using) ||
      (this.workpackTemplate.properties[foundIndex].value != prop.value) ||
      (this.workpackTemplate.properties[foundIndex].label != prop.label) ||
      (this.workpackTemplate.properties[foundIndex].rows != prop.rows) ||
      (this.workpackTemplate.properties[foundIndex].fullLine != prop.fullLine)
    );
  }

  //Start - Save Button Interaction
  ShowSaveButton(){
    this.SaveButtonBottomPosition = "50px";
    this.HideMessage();
  }

  HideSaveButton(){
    this.SaveButtonBottomPosition = "-40px";
  }

  ShowMessage(){
    this.MessageRightPosition = "50px";
  }

  HideMessage(){
    this.MessageRightPosition = "-180px";
  }
  //End - Save Button Interaction

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
      {'type':'Number',     'target':{'source': 'font',    'set': '',   'icon': '.0'}},
      {'type':'Text',       'target':{'source': 'font',    'set': '',   'icon': 'T'}},
      {'type':'Currency',   'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-dollar-sign'}},
      {'type':'Measure',    'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-tachometer-alt'}},
      {'type':'TextArea',   'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-align-justify'}},
      {'type':'Integer',    'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-hashtag'}},
      {'type':'Email',      'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-at'}},
      {'type':'NumberList', 'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-sort-numeric-down'}},
      {'type':'Date',       'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-calendar'}},
      {'type':'Selection',  'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-list-ul'}},
    ];
    let typeFound = logoHTMLMap.find(elem => elem.type == type);
    return (typeFound) ? typeFound.target : code4TypeNotFound;
  }


  AddProperty(type: String) {
    (this.formGroupWorkpackTemplate.get('properties') as FormArray).push(
      this.fb.group({
        toDelete: [false],
        editing: [true],
        id: [''],
        name: ['', Validators.required],
        type: [type],
        using: [true],
        sortIndex: [''],
        value: [''],
        min: [''],
        max: [''],
        custom: [true],
        possibleValues: [[]],
        label: [''],
        rows: [1],
        fullLine: [false]
      })
    );
  }

  EditProperty(index) {
    (this.formGroupWorkpackTemplate.get("properties") as FormArray)
      .at(index)
      .get('editing')
      .setValue(true);
  }

  StopEditing(index) {
    (this.formGroupWorkpackTemplate.get("properties") as FormArray)
      .at(index)
      .get('editing')
      .setValue(false);
  }

  ClosePropertiesPanel() {
    (this.formGroupWorkpackTemplate.get("properties") as FormArray)
      .controls
      .forEach((propCtrl) => {
        propCtrl.get('editing').setValue(false);
      });
    this.viewOptions.propertiesPanelOpenState = false;
  }

  DeleteProperty(index, type) {
    let props = (this.formGroupWorkpackTemplate.get("properties") as FormArray);
    let prop = props.at(index);

    if (prop.value.id != '') {
      prop.get('toDelete').setValue(true);
    }
    else {
      // remove the chosen row
      props.removeAt(index);
    }
  }

  onSubmit(){
    this.workpackTemplate.id = (this.workpackTemplate.id == 'new') ? '' : this.workpackTemplate.id;
    this.workpackTemplate.name = this.formGroupWorkpackTemplate.get('name').value.trim();
    while (this.workpackTemplate.properties.length > 0) {
      this.workpackTemplate.properties.pop();
    }
    this.formGroupWorkpackTemplate.get('properties').value.forEach(property => {
      console.log(property);
      if(property.toDelete){
        //this.workpackDataService.DeleteProperty(property.id);
      }
      else{
        let newProperty = new PropertyProfile();
        newProperty.id = (property.id == 'new') ? '' : property.id;
        newProperty.custom = property.custom;
        newProperty.max = property.max;
        newProperty.min = property.min;
        newProperty.name = property.name;
        newProperty.possibleValues = property.possibleValues;
        newProperty.sortIndex = property.sortIndex;
        newProperty.type = property.type;
        newProperty.using = property.using;
        newProperty.value = property.value;
        newProperty.label = property.label;
        newProperty.rows = property.rows;
        newProperty.fullLine = property.fullLine;
        this.workpackTemplate.properties.push(newProperty);
      }
    });

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
        this.viewOptions = this.route.snapshot.data.workpacktemplate;
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
        this.subscriptions.push(
          this.workpackDataService
          .UpdateWorkpackTemplate(this.workpackTemplate)
          .subscribe(
            wt => {
              this.workpackTemplate = wt;
              this.LoadFormControls();
              this.ShowMessage();
              window.setTimeout(
                () => {this.HideMessage();}, 
                3000);
              this.crumbService.SetCurrentWorkpackTemplate(wt);
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
