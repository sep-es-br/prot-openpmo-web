import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../../model/office';
import { PlanStructure } from '../../model/plan-structure';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { PlanDataService } from '../../services/data/plan/plan-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LocaleService } from '../../services/locale/locale-service.service';

@Component({
  selector: 'app-plan-structure',
  templateUrl: './plan-structure.component.html',
  styleUrls: ['./plan-structure.component.css']
})
export class PlanStructureComponent implements OnInit {

  localeConfig: any;

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private PlanDataService: PlanDataService,
    private workpackDataService: WorkpackDataService,
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private localeService: LocaleService) {}

  formGroupPlanStructure = this.fb.group({
    name: ['', Validators.required],
    fullName: ['']
  });
  
  subscriptions: Subscription[] = [];
  office: Office = new Office();
  planStructure: PlanStructure = new PlanStructure();
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  propertiesPanelOpenState: Boolean = false;
  workpackModelsPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

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
      this.workpackModelsPanelOpenState = false;
    }     

    this.subscriptions.push(
      this.PlanDataService.planStructure.subscribe(ps => {
        this.planStructure = ps;
        this.formGroupPlanStructure.controls['name'].setValue(this.planStructure.name);
        this.formGroupPlanStructure.controls['fullName'].setValue(this.planStructure.fullName);
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    this.formGroupPlanStructure.statusChanges.subscribe(status => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupPlanStructure.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
    });

    this.HideMessage();

  }

  //Identify changes made by the user in 'name' or 'fullname'
  UserChangedSomething(val): Boolean {
    if (val.name != this.planStructure.name) return true;
    if (val.fullName != this.planStructure.fullName) return true;
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
    this.title = (action == 'new') ? 'New Plan Structure' : '';
  }

  ////////////////////////////////////////////////////////////////////////
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.planStructure.name = this.formGroupPlanStructure.value.name.trim();
    this.planStructure.fullName = this.formGroupPlanStructure.value.fullName.trim();
    if (this.action == 'new') {
      this.office.planStructures.push(this.planStructure);
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
        this.PlanDataService
        .UpdatePlanStructure(this.planStructure)
        .subscribe(
          ps => {
            this.planStructure = ps;
            this.HideSaveButton();
            this.ShowMessage();
            window.setTimeout(
              () => {this.HideMessage();}, 
              3000);
            this.crumbService.SetCurrentPlanStructure(ps);
          }
        )
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Workpack Model
  //
  //Identification Parameter: id
  //
  DeleteWorkpackModel(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackModelById(id)
      .subscribe(workpackModel2delete => {
        if (workpackModel2delete.components.length > 0) {
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig['Warning'],
              message: this.localeConfig['Sorry, you can not delete a workpack model that contains nested workpack models.'],
              action: "OK"
            }
          });
        }
        else {
          this.subscriptions.push(
            this.dialog.open(MessageDialogComponent, { 
              data: {
                title: this.localeConfig['Attention'],
                message: this.localeConfig['Are you sure you want to delete'] + workpackModel2delete.name + "?",
                action: "YES_NO"
              }
            })
            .afterClosed()
            .subscribe(res => {
              if (res == "YES") {
                this.subscriptions.push(
                  this.workpackDataService.DeleteWorkpackModel(id).subscribe(
                    () => {
                      this.subscriptions
                      .push(
                        this.PlanDataService.QueryPlanStructureById(this.planStructure.id)
                        .subscribe(ps => ps));
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
    this.crumbService.CleanPlanStructure();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
