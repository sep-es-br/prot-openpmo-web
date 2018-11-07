import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../../model/office';
import { SchemaTemplate } from '../../model/schema-template';
import { Useful } from '../../useful';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { TranslateConstants } from '../../model/translate';

@Component({
  selector: 'app-schema-template',
  templateUrl: './schema-template.component.html',
  styleUrls: ['./schema-template.component.css']
})
export class SchemaTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private workpackDataService: WorkpackDataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) {}

  //Constants for translate
  translate = new TranslateConstants();

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  shortNameFormControl = new FormControl('', [
    Validators.required
  ]);
  formGroupSchemaTemplate = this.fb.group({
    name: ['', Validators.required],
    shortName: ['', Validators.required]
  });
  
  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  propertiesPanelOpenState: Boolean = false;
  workpackTemplatesPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  ngOnInit() {
    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.workpackTemplatesPanelOpenState = false;
    }     

    this.subscriptions.push(
      this.schemaDataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
        this.formGroupSchemaTemplate.controls['name'].setValue(this.schemaTemplate.name);
        this.formGroupSchemaTemplate.controls['shortName'].setValue(this.schemaTemplate.shortName);
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    this.formGroupSchemaTemplate.statusChanges.subscribe(status => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupSchemaTemplate.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
    });

    this.HideMessage();

  }


  UserChangedSomething(val): Boolean {
    if (val.name != this.schemaTemplate.name) return true;
    if (val.shortName != this.schemaTemplate.shortName) return true;
  }



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

  SetPanels(action: String) {
    this.action = action;
    this.title = (action == 'new') ? 'New Schema Template' : '';
  }

  onSubmit(){

    this.schemaTemplate.name = this.formGroupSchemaTemplate.value.name.trim();
    this.schemaTemplate.shortName = this.useful.GetShortName(this.formGroupSchemaTemplate.value.shortName);
    if (this.action == 'new') {
      this.office.schemaTemplates.push(this.schemaTemplate);
      this.subscriptions.push(
        this.officeDataService
        .UpdateOffice(this.office)
        .subscribe(
          ret => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.schemaDataService
        .UpdateSchemaTemplate(this.schemaTemplate)
        .subscribe(
          st => {
            this.schemaTemplate = st;
            this.HideSaveButton();
            this.ShowMessage();
            window.setTimeout(
              () => {this.HideMessage();}, 
              3000);
            this.crumbService.SetCurrentSchemaTemplate(st);
          }
        )
      );
    }
  }

  DeleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete " + workpackTemplate2delete.name + " because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpackTemplate2delete.name + "?")) {
          this.workpackDataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.schemaDataService.QuerySchemaTemplateById(this.schemaTemplate.id).subscribe(res => res);
            }
          );
        }
      })
    );
  }


  ngOnDestroy() {
    this.crumbService.CleanSchemaTemplate();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
