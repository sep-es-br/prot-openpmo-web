import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Plan } from '../../model/plan';
import { Office } from '../../model/office';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { PlanStructure } from '../../model/plan-structure';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { PlanDataService } from '../../services/data/plan/plan-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LocaleService } from '../../services/locale/locale-service.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  localeConfig: Object = new Object();

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private PlanDataService: PlanDataService,
    private workpackDataService: WorkpackDataService,
    private router: Router,
    private crumbService: BreadcrumbService, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    private localeService: LocaleService,) {}

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  plan: Plan = new Plan();
  planStructure: PlanStructure = new PlanStructure();
  PlanId: String = '';
  planStructureId: String = '';
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  propertiesPanelOpenState: Boolean = false;
  workpacksPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  formGroupPlan = this.fb.group({
    name: ['', Validators.required],
    fullName: ['']
  });

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

    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.workpacksPanelOpenState = false;
    } 
    let arrIds = this.route.snapshot.paramMap.get('id').split('&');
    this.PlanId = arrIds[0];
    
    this.subscriptions.push(
      this.PlanDataService.planStructure.subscribe(ps => {
        this.planStructure = ps;
      })
    );
    
    this.subscriptions.push(
      this.PlanDataService.plan.subscribe(s =>{
        this.plan = s;
        this.formGroupPlan.controls['name'].setValue(this.plan.name);
        this.formGroupPlan.controls['fullName'].setValue(this.plan.fullName);
        this.HideSaveButton();     

      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    if (this.action == 'new') {
      this.PlanDataService.planStructure.subscribe(ps => {
        this.plan.structure = ps;
      });
    }

    this.formGroupPlan.statusChanges.subscribe(status => {
      return (status == 'VALID' && this.UserChangedSomething(this.formGroupPlan.value)) 
      ? this.ShowSaveButton() 
      : this.HideSaveButton();
    });

    this.HideMessage(); 
  }

  //Identify changes made by the user in 'name' or 'fullname'
  UserChangedSomething(val): Boolean {
    if (val.name != this.plan.name) return true;
    if (val.fullName != this.plan.fullName) return true;
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
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.plan.name = this.formGroupPlan.value.name.trim();
    this.plan.fullName = this.formGroupPlan.value.fullName.trim();
    if (this.action == 'new') {
      this.office.plans.push(this.plan);
      this.subscriptions.push(
        this.officeDataService
        .UpdateOffice(this.office)
        .subscribe(
          () => {
            this.router.navigate(['./office/edit/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.PlanDataService
        .UpdatePlan(this.plan)
        .subscribe(
          s => {
            this.plan = s;
            this.HideSaveButton();
            this.ShowMessage();
            window.setTimeout(
             () => {this.HideMessage();}, 
             3000);
            this.crumbService.SetCurrentPlan(s);
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
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig['Warning'],
              message: this.localeConfig['Sorry, you can not delete a workpack that contains nested workpacks.'],
            }
          });
        }
        else {
          this.subscriptions.push(
            this.dialog.open(MessageDialogComponent, { 
              data: {
                title: this.localeConfig['Attention'],
                message: this.localeConfig['Are you sure you want to delete'] + workpack2delete.name + "?",
                action: this.localeConfig['YES_NO'],
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
                        this.PlanDataService.QueryPlanById(this.plan.id)
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
  // END OF PAGE
  // Suspension of signatures when closing the page
  ngOnDestroy() {
    this.crumbService.CleanPlan();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
