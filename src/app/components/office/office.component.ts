import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Office } from '../../model/office';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { PlanDataService } from '../../services/data/plan/plan-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LocaleService } from '../../services/locale/locale-service.service';
import { LocaleConfig } from '../../model/locale-config';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  localeConfig: LocaleConfig = new LocaleConfig();

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private PlanDataService: PlanDataService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private localeService: LocaleService) { }
  
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
  PlansPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Prepare data before loading screen
  ngOnInit() {
    //Translate Service
    this.localeService.localeConfig.subscribe(
      (conf) => {
        this.localeConfig = conf;
      }
    ); 
    
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.PlansPanelOpenState = false;
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

  @Input() lang;
  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Plan
  //
  //Identification Parameter: id
  //
  DeletePlan(id: string) {
    this.PlanDataService.GetPlanById(id).subscribe(Plan2delete => {
      if (Plan2delete.workpacks.length > 0) {
        this.dialog.open(MessageDialogComponent, { 
          data: {
            title: "Warning",
            message: "Sorry, you can not delete a plan that contains nested workpacks.",
            action: "OK"
          }
        });
      }
      else {
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: "Attention",
              message: "Are you sure to delete " + Plan2delete.name + "?",
              action: "YES_NO"
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.PlanDataService.DeletePlan(id).subscribe(
                  () => {
                    this.subscriptions
                    .push(
                      this.officeDataService.QueryOfficeById(this.office.id)
                      .subscribe(o => o));
                  }
                )                      
              );
            }
          })
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
