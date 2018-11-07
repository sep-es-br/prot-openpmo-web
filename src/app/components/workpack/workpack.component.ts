import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription } from 'rxjs';
import { Office } from '../../model/office';
import { Schema } from '../../model/schema';
import { Workpack } from '../../model/workpack';
import { Useful } from '../../useful';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { WorkpackTemplate } from '../../model/workpack-template';
import { ViewOptions } from '../../model/view-options';
import { FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';

@Component({
  selector: 'app-workpack',
  templateUrl: './workpack.component.html',
  styleUrls: ['./workpack.component.css']
})
export class WorkpackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private workpackDataService: WorkpackDataService,
    private useful: Useful,
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) {}

    formGroupWorkpack = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      properties: this.fb.array([])
    });
     
  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schema: Schema = new Schema();
  workpack: Workpack = new Workpack();
  workpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  id: String;
  viewOptions: ViewOptions;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  ngOnInit() {
    this.viewOptions = this.route.snapshot.data.workpack;
    
    this.subscriptions.push(
      this.workpackDataService.workpackTemplate.subscribe(wt => {
        this.workpackTemplate = wt;
      })
    );
    
    this.subscriptions.push(
      this.workpackDataService.workpack.subscribe(wp =>{
        this.workpack = wp;
        if (this.workpack.id != '') {
          this.LoadFormControls();
        }
      })
    );

    this.subscriptions.push(
      this.schemaDataService.schema.subscribe(s => {
        this.schema = s;
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    this.subscriptions.push(    
      this.formGroupWorkpack.statusChanges.subscribe((status) => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupWorkpack.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );



    
  }

  CleanPropertiesFormArray(){
    const ctrl = <FormArray>this.formGroupWorkpack.controls['properties'];
    while (this.formGroupWorkpack.controls['properties'].value.length !== 0) {
      ctrl.removeAt(0);
    }
  }

  LoadFormControls() {
    this.formGroupWorkpack.controls['name'].setValue(this.workpack.name);
    this.formGroupWorkpack.controls['shortName'].setValue(this.workpack.shortName);
    this.CleanPropertiesFormArray();
    this.workpack.properties.forEach(property => {
      (this.formGroupWorkpack.get('properties') as FormArray).push(
        this.fb.group({
          toDelete: [false],
          editing: [false],
          id: [property.id],
          name: [property.name, Validators.required],
          typeName: [property.typeName],
          min: [(property.min == null) ? '0' : property.min],
          max: [(property.max == null) ? '100' : property.max],
          value: [(property.value == null) ? "" : property.value]
        })
      );
    });
  }

  UserChangedSomething(val): Boolean {
    if (val.name != this.workpack.name) return true;
    if (val.shortName != this.workpack.shortName) return true;
    if (val.properties.length != this.workpack.properties.length) return true;
    let changed = false;
    val.properties.forEach((prop, i) => {
      if (prop.id == '') changed = true;
      if (prop.toDelete) changed = true;
      if (prop.name != this.workpack.properties[i].name) changed = true;
      //if (prop.min != this.workpackTemplate.properties[i].min) changed = true;
      //if (prop.max != this.workpackTemplate.properties[i].max) changed = true;
      //if (prop.value != this.workpackTemplate.properties[i].value) changed = true;
    });
    return changed;
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


  SetTrimmedNameAndShortName(value: String){
    this.workpack.name = this.useful.GetTrimmedName(value);
    this.workpack.shortName = this.useful.GetShortName(this.workpack.name);
  }

  onSubmit(){
    this.workpack.name = this.workpack.name.trim();
    this.workpack.shortName = this.useful.GetShortName(this.workpack.shortName);
    this.workpack.template = this.workpackTemplate;
    
    switch (this.viewOptions.action) {
      case 'new2schema': {
        this.schema.workpacks.push(this.workpack);
        this.subscriptions.push(
          this.schemaDataService
          .UpdateSchema(this.schema)
          .subscribe(
            () => {
              this.viewOptions.action = 'edit';
              this.router.navigate([
                './schema/' + this.viewOptions.action + 
                '/' + this.schema.id +
                '&' + this.schema.template.id]);
            }
          )
        );
        break;
      }
      case 'new2workpack': {
        this.subscriptions.push(
          this.workpackDataService.GetWorkpackById(this.crumbService.GetBeforeLast(1).id)
          .subscribe(parentWP => {
            parentWP.components.push(this.workpack);
            this.subscriptions.push(
              this.workpackDataService
              .UpdateWorkpack(parentWP)
              .subscribe(
                () => {
                  this.viewOptions.action = 'edit';
                  this.router.navigate([
                    './workpack/'+ this.viewOptions.action + 
                    '/' + parentWP.id +
                    '&' + parentWP.template.id]);
                }
              )
            );
          })
        );
        break;
      }
      case 'edit': {
        this.subscriptions.push(
          this.workpackDataService.GetWorkpackById(this.crumbService.GetLast().id)
          .subscribe(parentWP => {
            this.subscriptions.push(
              this.workpackDataService
              .UpdateWorkpack(this.workpack)
              .subscribe(
                wp => {
                  this.workpackTemplate = wp;
                  this.LoadFormControls();
                  this.ShowMessage();
                  window.setTimeout(
                    () => {this.HideMessage();}, 
                    3000);
                  this.crumbService.SetCurrentWorkpackTemplate(wp);
                }
              )
            );
          })
        )
      }
    }
  }

  DeleteWorkpack(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackById(id)
      .subscribe(workpack2delete => {
        if (workpack2delete.components.length > 0) {
          alert("Sorry, you can not delete " + workpack2delete.name + " because it is not empty.")
        }
        else if(confirm("Are you sure you want to delete " + workpack2delete.name + "?")) {
          this.workpackDataService.DeleteWorkpack(id).subscribe(
            () => {
              this.subscriptions
              .push(this.workpackDataService.QueryWorkpackById(this.workpack.id)
                .subscribe(wp => wp));
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
