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
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) {}

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
    shortName: ['', Validators.required]
  });



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
        this.formGroupSchema.controls['shortName'].setValue(this.schema.shortName);
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

    this.formGroupSchema.statusChanges.subscribe(val => {
      this.ShowSaveButton();
    });

    this.HideMessage(); 
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
    this.title = (action == 'new') ? 'New' : '';
    this.showForm = ((action != 'children') && (action.slice(0,6) != 'delete'));
    this.showChildren = (action != 'edit')
  }

  SetTrimmedNameAndShortName(value: String){
    this.schema.name = this.useful.GetTrimmedName(value);
    this.schema.shortName = this.useful.GetShortName(this.schema.name);
  }

  onSubmit(){
    this.schema.name = this.formGroupSchema.value.name.trim();
    this.schema.shortName = this.useful.GetShortName(this.formGroupSchema.value.shortName);
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


  ngOnDestroy() {
    this.crumbService.CleanSchema();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
