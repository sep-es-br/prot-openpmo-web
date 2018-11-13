import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Schema } from '../../model/schema';
import { Office } from '../../model/office';
import { Useful } from '../../useful';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { SchemaTemplate } from '../../model/schema-template';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { TranslateConstants } from '../../model/translate';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private workpackDataService: WorkpackDataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService, private fb: FormBuilder ) {}

  //Constants for translate
  translate = new TranslateConstants();

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schema: Schema = new Schema();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  schemaId: String = '';
  schemaTemplateId: String = '';
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  propertiesPanelOpenState: Boolean = false;
  workpacksPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  formGroupSchema = this.fb.group({
    name: ['', Validators.required],
    fullName: ['']
  });

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Preparing data before loading screen
  ngOnInit() {
    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.workpacksPanelOpenState = false;
    } 
    let arrIds = this.route.snapshot.paramMap.get('id').split('&');
    this.schemaId = arrIds[0];
    
    this.subscriptions.push(
      this.schemaDataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
      })
    );
    
    this.subscriptions.push(
      this.schemaDataService.schema.subscribe(s =>{
        this.schema = s;
        this.formGroupSchema.controls['name'].setValue(this.schema.name);
        this.formGroupSchema.controls['fullName'].setValue(this.schema.fullName);
        this.HideSaveButton();     

      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    if (this.action == 'new') {
      this.schemaDataService.schemaTemplate.subscribe(st => {
        this.schema.template = st;
      });
    }

    this.formGroupSchema.statusChanges.subscribe(status => {
      return (status == 'VALID' && this.UserChangedSomething(this.formGroupSchema.value)) 
      ? this.ShowSaveButton() 
      : this.HideSaveButton();
    });

    this.HideMessage(); 
  }

  //Identifying changes made by the user in 'name' or 'fullname'
  UserChangedSomething(val): Boolean {
    if (val.name != this.schema.name) return true;
    if (val.fullName != this.schema.fullName) return true;
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

  //Panel definition dariables
  SetPanels(action: String) {
    this.action = action;
    this.title = (action == 'new') ? 'New' : '';
    this.showForm = ((action != 'children') && (action.slice(0,6) != 'delete'));
    this.showChildren = (action != 'edit')
  }

  ////////////////////////////////////////////////////////////////////////
  // EXPORTING TO THE DATABASE
  //
  // Exporting the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.schema.name = this.formGroupSchema.value.name.trim();
    this.schema.fullName = this.formGroupSchema.value.fullName.trim();
    if (this.action == 'new') {
      this.office.schemas.push(this.schema);
      this.subscriptions.push(
        this.officeDataService
        .UpdateOffice(this.office)
        .subscribe(
          ret => {
            this.router.navigate(['./office/edit/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./office/edit/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.schemaDataService
        .UpdateSchema(this.schema)
        .subscribe(
          s => {
            this.schema = s;
            this.HideSaveButton();
            this.ShowMessage();
            window.setTimeout(
             () => {this.HideMessage();}, 
             3000);
            this.crumbService.SetCurrentSchema(s);
          }
        )
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Workpack
  //
  //Identification Parameter: id
  //
  DeleteWorkpack(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackById(id)
      .subscribe(workpack2delete => {
        if (workpack2delete.components.length > 0) {
          alert("Sorry, you can not delete this workpack because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpack2delete.name + "?")) {
          this.workpackDataService.DeleteWorkpack(id).subscribe(
            () => {
              this.subscriptions
              .push(
                this.schemaDataService.QuerySchemaById(this.schema.id)
                .subscribe(res => res)
              );
            }
          );
        }
      })
    );
  }

  ////////////////////////////////////////////////////////////////////////
  // END OF PAGE
  // Suspension of signatures when closing the page
  ngOnDestroy() {
    this.crumbService.CleanSchema();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
