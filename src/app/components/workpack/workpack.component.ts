import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription } from 'rxjs';
import { Office } from '../../model/office';
import { Plan } from '../../model/plan';
import { Workpack } from '../../model/workpack';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { WorkpackModel } from '../../model/workpack-model';
import { ViewOptions } from '../../model/view-options';
import { FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { PlanDataService } from '../../services/data/plan/plan-data.service';
import { PropertyProfile } from 'src/app/model/property-profile';
import { FlexLayoutModule } from '@angular/flex-layout';
import { isNullOrUndefined } from 'util';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Property } from 'src/app/model/property';
import { Role, ActorType } from 'src/app/model/role';
import { RoleDataService } from 'src/app/services/data/role/role-data.service';
import { LocaleService } from '../../services/locale/locale-service.service';

@Component({
  selector: 'app-workpack',
  templateUrl: './workpack.component.html',
  styleUrls: ['./workpack.component.css']
})
export class WorkpackComponent implements OnInit {

  localeConfig: any;

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private PlanDataService: PlanDataService,
    private workpackDataService: WorkpackDataService,
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private roleDataService: RoleDataService,
    private localeService: LocaleService) {}

  formGroupWorkpack = this.fb.group({
    id: [''],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    properties: this.fb.array([])
  });
     
  subscriptions: Subscription[] = [];
  office: Office = new Office();
  plan: Plan = new Plan();
  workpack: Workpack = new Workpack();
  workpackModel: WorkpackModel = new WorkpackModel();
  id: String;
  viewOptions: ViewOptions = new ViewOptions();
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;
  wpRoles: Role[] = [];

  actorTypes = ActorType;
  
  ActorTypeKeys() : Array<string> {
    var keys = Object.keys(ActorType);
    return keys;
  }

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Prepare data before loading screen
  ngOnInit() {

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 

    this.viewOptions = this.route.snapshot.data.workpack;
    
    this.subscriptions.push(
      this.workpackDataService.workpackModel.subscribe(wm => {
        this.workpackModel = wm;
      })
    );
    
    this.subscriptions.push(
      this.workpackDataService.workpack.subscribe(wp =>{
        this.workpack = wp;
        if (this.workpack.id != '') {
          this.subscriptions.push(
            this.roleDataService.GetAllRoles().subscribe(
              res => {
                this.wpRoles = res.filter((role)=>(role.scope.id == this.workpack.id));
              }
            )
          );
          this.LoadFormControls();
        }
      })
    );

    this.subscriptions.push(
      this.PlanDataService.plan.subscribe(s => {
        this.plan = s;
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

  //Clear property form
  CleanPropertiesFormArray(){
    const ctrl = <FormArray>this.formGroupWorkpack.controls['properties'];
    while (this.formGroupWorkpack.controls['properties'].value.length !== 0) {
      ctrl.removeAt(0);
    }
  }

  //Load property form
  LoadFormControls() {
    this.formGroupWorkpack.controls['name'].setValue(this.workpack.name);
    this.CleanPropertiesFormArray();
    this.workpack.model.propertyProfiles
      .sort((a,b) => {
        return (a.sortIndex < b.sortIndex) ? -1 : 1;
      })
      .forEach(pProfile => {
        let foundProperty = this.workpack.properties.find(p => (p.profile.id == pProfile.id));
      (this.formGroupWorkpack.get('properties') as FormArray).push(
        this.fb.group({
          id: [(foundProperty !== undefined) ? foundProperty.id : ''],
          name: [pProfile.name],
          value: [(foundProperty !== undefined) ? foundProperty.value : '',
                  (pProfile.required) ? Validators.required : ''],
          profile: [pProfile]
        })
      );
    });
  }

  ConvertToNumber(val: String): Number {
    let num = Number(val);
    return (num == NaN) ? 0 : num;
  }

  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.workpack.name) return true;
    if (val.properties.length != this.workpack.properties.length) return true;
    let changed = false;
    val.properties.forEach((cntrlProp) => {
      let propIndex = this.workpack.properties.findIndex(p => (p.id == cntrlProp.id));
      if (propIndex == -1) {
        changed = true;
      }
      else if (cntrlProp.value != this.workpack.properties[propIndex].value) {
        changed = true;;
      }
    });
    return changed;
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
    this.workpack.name = this.formGroupWorkpack.value.name.trim();
    this.workpack.model = this.workpackModel;
    this.formGroupWorkpack.value.properties.forEach(prop => {
      let property = this.workpack.properties.find(p => (p.profile.id == prop.profile.id));
      if (isNullOrUndefined(property)) {
        property = {
          id: '',
          name: prop.name,
          value: prop.value,
          profile: prop.profile
        };
        this.workpack.properties.push(property)
      }
      else {
        property.value = prop.value;
        property.name = property.profile.name;
      }
    });
    
    switch (this.viewOptions.action) {
      case 'new2Plan': {
        this.workpack.id = null;
        this.plan.workpacks.push(this.workpack);
        this.subscriptions.push(
          this.PlanDataService
          .UpdatePlan(this.plan)
          .subscribe(
            () => {
              this.viewOptions.action = 'edit';
              this.router.navigate([
                './plan/' + this.viewOptions.action + 
                '/' + this.plan.id +
                '&' + this.plan.structure.id]);
            }
          )
        );
        break;
      }
      case 'new2workpack': {
        this.subscriptions.push(
          this.workpackDataService.GetWorkpackById(this.crumbService.GetBeforeLast(1).id)
          .subscribe(parentWP => {
            this.workpack.id = null;
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
                    '&' + parentWP.model.id]);
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
                  this.workpackModel = wp.model;
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
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig["Warning"],
              message: this.localeConfig["Sorry, you can not delete a workpack that contains nested workpacks."],
              action: "OK"
            }
          });
        }
        else {
          this.subscriptions.push(
            this.dialog.open(MessageDialogComponent, { 
              data: {
                title: this.localeConfig["Attention"],
                message: this.localeConfig["Are you sure you want to delete"] + workpack2delete.name + "?",
                action: "YES_NO"
              }
            })
            .afterClosed()
            .subscribe(res => {
              if (res == "YES") {
                this.subscriptions.push(
                  this.workpackDataService.DeleteWorkpack(id).subscribe(
                    () => {
                      this.subscriptions
                      .push(
                        this.workpackDataService.QueryWorkpackById(this.workpack.id)
                        .subscribe(wpm => wpm));
                    }
                  )                      
                );
              }
            })
          );
        }
      })
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Role
  //
  //Identification Parameter: role id
  //
  RemoveRole(id: string) {
    this.subscriptions
    .push(
      this.roleDataService
      .GetRoleById(id)
      .subscribe(role2delete => {
        const msg = `${this.localeConfig["Are you sure to remove"]} ${role2delete.actor.name} ` +
                    `${this.localeConfig["as stakeholder of this"]} ${this.workpack.model.name}?`;
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig["Attention"],
              message:  msg,
              action: this.localeConfig["YES_NO"]
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.roleDataService.RemoveRole(id).subscribe(
                  () => {
                    this.subscriptions
                    .push(
                      this.workpackDataService.QueryWorkpackById(this.workpack.id)
                      .subscribe(wp => wp));
                  }
                )                      
              );
            }
          })
        );
      })
    );
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
