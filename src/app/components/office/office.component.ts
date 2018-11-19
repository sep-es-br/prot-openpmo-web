import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../../model/office';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { TranslateConstants } from '../../model/translate';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) { }

  //Constants for translate
  translate = new TranslateConstants();
  
  formGroupOffice = this.fb.group({
    name: ['', Validators.required],
    fullName: ['']
  });
  
  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];
  propertiesPanelOpenState: Boolean = false;
  schemasPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Prepare data before loading screen
  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.schemasPanelOpenState = false;
    } 
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
        this.formGroupOffice.controls['name'].setValue(this.office.name);
        this.formGroupOffice.controls['fullName'].setValue(this.office.fullName);
        this.HideSaveButton();     
      })
    );

    this.formGroupOffice.statusChanges.subscribe(status => {
      return (status == 'VALID' && this.UserChangedSomething(this.formGroupOffice.value)) 
      ? this.ShowSaveButton() 
      : this.HideSaveButton();
    });

    this.HideMessage();

    //Update path traveled by the user
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  
  //Identify changes made by the user in 'name' or 'fullname'
  UserChangedSomething(val): Boolean {
    if (val.name != this.office.name) return true;
    if (val.fullName != this.office.fullName) return true;
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

  ////////////////////////////////////////////////////////////////////////
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.office.name = this.formGroupOffice.value.name.trim();
    this.office.fullName = this.formGroupOffice.value.fullName.trim();

    this.subscriptions.push(
      this.officeDataService
      .SaveOffice(this.office)
      .subscribe(
        o => {
          this.office = o;
          this.HideSaveButton();
          this.ShowMessage();
          window.setTimeout(
           () => {this.HideMessage();}, 
           3000);
          this.crumbService.SetCurrentOffice(o);
          if (this.action == 'new') {
            this.router.navigate(['./']);
          }
        }
      )
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Schema
  //
  //Identification Parameter: id
  //
  DeleteSchema(id: string) {
    this.schemaDataService.GetSchemaById(id).subscribe(schema2delete => {
      if (schema2delete.workpacks.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schema2delete.name + "?")) {
        this.schemaDataService.DeleteSchema(id).subscribe(
          () => {
            this.officeDataService.QueryOfficeById(this.office.id);
            this.router.navigate (['./office/' + this.action + '/' + this.office.id]);
          }
        );
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////
  // END OF PAGE
  // Suspension of signatures when closing the page
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
