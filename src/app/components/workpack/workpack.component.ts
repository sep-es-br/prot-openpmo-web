import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription } from 'rxjs';
import { Office } from '../../model/office';
import { Schema } from '../../model/schema';
import { Workpack } from '../../model/workpack';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { WorkpackTemplate } from '../../model/workpack-template';
import { ViewOptions } from '../../model/view-options';
import { FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { TranslateConstants } from '../../model/translate';
import { PropertyProfile } from 'src/app/model/property-profile';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) {}

    //Constants for translate
    translate = new TranslateConstants();

    formGroupWorkpack = this.fb.group({
      id: [''],
      name: ['', Validators.required],
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
          console.log('formcontrol', this.formGroupWorkpack);
          console.log('wp', this.workpack);
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
    this.CleanPropertiesFormArray();
    this.workpack.properties
      .sort((a,b) => {
        return (a.profile.sortIndex < b.profile.sortIndex) ? -1 : 1;
      })
      .forEach(property => {
      (this.formGroupWorkpack.get('properties') as FormArray).push(
        this.fb.group({
          id: [property.id],
          name: [property.name],
          value: [property.value],
          profile: [property.profile]
        })
      );
    });
  }

  ArrayOf(list: String): String[] {
    let array = list.split(',');
    array.forEach(str => {
      str = str.trim();
    });
    return array;
  }

  UserChangedSomething(val): Boolean {
    if (val.name != this.workpack.name) return true;
    let changed = false;
    val.properties.forEach((prop, i) => {
      if (prop.value != this.workpack.properties[i].value) changed = true;
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


  onSubmit(){
    this.workpack.name = this.formGroupWorkpack.value.name.trim();
    this.workpack.template = this.workpackTemplate;
    this.formGroupWorkpack.value.properties.forEach(prop => {
      let property = this.workpack.properties.find(p => (p.profile.id == prop.profile.id));
      property.value = prop.value;
      property.name = property.profile.name;
    });
    
    switch (this.viewOptions.action) {
      case 'new2schema': {
        this.workpack.id = '';
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
            this.workpack.id = '';
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
                  this.workpackTemplate = wp.template;
                  this.LoadFormControls();
                  this.ShowMessage();
                  window.setTimeout(
                    () => {this.HideMessage();}, 
                    3000);
                  this.crumbService.SetCurrentWorkpack(wp);
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
