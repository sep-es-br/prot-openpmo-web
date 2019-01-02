import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Workpack } from 'src/app/model/workpack';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkpackDataService } from 'src/app/services/data/workpack/workpack-data.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Cost, CostEntry, CostStage } from 'src/app/model/cost';
import { Actor } from 'src/app/model/actor';
import { CostDataService } from 'src/app/services/data/cost/cost-data.service';
import { Scope } from 'src/app/model/scope';
import { ActorDataService } from 'src/app/services/data/actor/actor-data.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private workpackDataService: WorkpackDataService,
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private costDataService: CostDataService,
    private actorDataService: ActorDataService) { }

  subscriptions: Subscription[] = [];

  workpack: Workpack = new Workpack();
  cost: Cost = new Cost();

  fundersSearched: Actor[] = [];
  selectedFunder: Actor = new Actor();

  propertiesPanelOpenState = true;

  title = "";

  costId: String = '';

  possibleCosts: String[] = [];

  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  formGroup = this.fb.group({
    id: [''],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    fullName: [''],
    funderId: [''],
    funderName: [''],
    funderFullName: ['']
  });

  ngOnInit() {

    this.costId = this.route.snapshot.paramMap.get('id');

    if (this.costId == 'new'){
      this.title = "New Cost";
      this.cost = new Cost;
      this.LoadFormControls();
    }
    else {
      this.costDataService.QueryCostById(this.costId);
      this.subscriptions.push(
        this.costDataService.cost.subscribe(cost =>{
          this.cost = cost;
          if (cost.id != '') {
            this.LoadFormControls();
          }
        })
      );
    }

    this.subscriptions.push(
      this.workpackDataService.workpack.subscribe(wp =>{
        this.workpack = wp;
      })
    );

    this.subscriptions.push(
      this.actorDataService.actors.subscribe(funders =>{
        this.fundersSearched = funders;
      })
    );


    this.subscriptions.push(    
      this.formGroup.controls['funderName'].statusChanges.subscribe((status) => {
        if (status == 'VALID') {
          this.SearchFunders(this.formGroup.value.funderName);
        }
        else {
          this.fundersSearched = [];
          this.CleanFunderControl();
        }
      })
    );

    this.subscriptions.push(    
      this.formGroup.statusChanges.subscribe((status) => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroup.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );    

  }


  //Load cost form concosts
  LoadFormControls() {
    this.formGroup.controls['id'].setValue(this.cost.id);
    this.formGroup.controls['name'].setValue(this.cost.name);
    this.formGroup.controls['fullName'].setValue(this.cost.fullName);
    if (this.cost.funder){
      this.formGroup.controls['funderId'].setValue(this.cost.funder.id);
      this.formGroup.controls['funderName'].setValue(this.cost.funder.name);
      this.formGroup.controls['funderFullName'].setValue(this.cost.funder.fullName);
    }
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.cost.name) return true;
    if (val.fullName != this.cost.fullName) return true;
    if (val.funderId != this.cost.funder.id) return true;
    return false;
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

  SearchFunders(name: string) {
    this.actorDataService.QueryActorsByName(name);
  }

  UpdateFunderControl(funderFound: Actor) {
    this.selectedFunder = funderFound;
    this.formGroup.controls['funderId'].setValue(funderFound.id);
    this.formGroup.controls['funderName'].setValue(funderFound.fullName);
    this.formGroup.controls['funderFullName'].setValue(funderFound.fullName);
  }

  CleanFunderControl() {
    this.formGroup.controls['funderId'].setValue('');
    this.formGroup.controls['funderName'].setValue('');
    this.formGroup.controls['funderFullName'].setValue('');
  }


  ////////////////////////////////////////////////////////////////////////
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.cost.name = this.formGroup.value.name.trim();
    this.cost.fullName = this.formGroup.value.name.trim();
    let funder: Actor = this.selectedFunder as Actor; // new Actor();
    this.cost.funder = funder;
    
    if (this.costId == 'new') {
      this.cost.id = null;
      this.workpack.costs.push(this.cost);
      this.subscriptions.push(
        this.workpackDataService.UpdateWorkpack(this.workpack).subscribe(
          () => {
            this.router.navigate([
              './workpack/edit/' + this.workpack.id +
              '&' + this.workpack.model.id]);
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.costDataService.UpdateCost(this.cost).subscribe(
          () => {
            this.router.navigate([
              './workpack/edit/' + this.workpack.id +
              '&' + this.workpack.model.id]);
          }
        )
      );
    }
  }

}
