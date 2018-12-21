import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { PlanDataService } from '../../services/data/plan/plan-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../../model/office';
import { PlanStructure } from '../../model/plan-structure';
import { WorkpackModel } from '../../model/workpack-model';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { PropertyProfile } from '../../model/property-profile';
import { MessageDialogComponent, DialogData } from '../message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LocaleService } from '../../services/locale/locale-service.service';
import { LocalityType } from 'src/app/model/locality';

@Component({
  selector: 'app-workpack-model',
  templateUrl: './workpack-model.component.html',
  styleUrls: ['./workpack-model.component.css']
})

@NgModule({
  
})

export class WorkpackModelComponent implements OnInit {

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
    private localeService: LocaleService ) {}

  formGroupWorkpackModel = this.fb.group({
    id: [''],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    propertyProfiles: this.fb.array([]),
    manageStakeholders: [true],
    personPossibleRoles: [''],
    orgPossibleRoles: [''],
  });

  color = 'primary';  

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  planStructure: PlanStructure = new PlanStructure();
  workpackModel: WorkpackModel = new WorkpackModel();
  parentWorkpackModel: WorkpackModel = new WorkpackModel();
  viewOptions: ViewOptions = new ViewOptions();
  siblings: WorkpackModel[] = [];
  tpTree: WorkpackModel = new WorkpackModel();
  flatTree: {
    ident: number;
    id: String;
    label: String; 
  }[];
  propertyTypes: String[] = [];
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  private localityTypes: String[] = Object.values(LocalityType);

  ngOnInit() {

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 

    this.viewOptions = this.route.snapshot.data.workpackmodel;

    this.subscriptions.push(
      this.workpackDataService.workpackModel.subscribe(wpm =>{
        this.workpackModel = wpm;
        if (this.workpackModel.id != '') {
          this.LoadFormControls();
        }
      })
    );
   
    this.HideMessage();

    this.subscriptions.push(
      this.workpackDataService.workpackModelTree
      .subscribe(tree => {
        this.flatTree = [];
        this.FlattenTree(tree,1);
      })
    );

    this.subscriptions.push(
      this.PlanDataService.planStructure.subscribe(ps => {
        this.planStructure = ps;
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );

    this.subscriptions.push(
      this.workpackDataService.propertyTypes.subscribe(pt =>{
        this.propertyTypes = pt.sort((a,b) => {
          return (a < b) ? -1 : 1; 
        });
      })
    );

    this.subscriptions.push(    
      this.formGroupWorkpackModel.statusChanges.subscribe((status) => {
        if (this.workpackModel.propertyProfiles === undefined) return this.HideSaveButton();
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupWorkpackModel.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );   

    this.subscriptions.push(    
      this.formGroupWorkpackModel.controls['manageStakeholders'].valueChanges.subscribe((enabled) => {
        if (!enabled) {
          this.CloseStakeholdersPanel();
        } 
      })
    );         

  }

  IsStakeholdersDisabled(): Boolean {
    return !this.formGroupWorkpackModel.value.manageStakeholders;
  }

  CleanPropertyProfilesFormArrays(){
    let ctrl = <FormArray>this.formGroupWorkpackModel.controls['propertyProfiles'];
    while (this.formGroupWorkpackModel.controls['propertyProfiles'].value.length !== 0) {
      ctrl.removeAt(0);
    }
  }

  LoadFormControls() {
    this.formGroupWorkpackModel.controls['name'].setValue(this.workpackModel.name);
    this.formGroupWorkpackModel.controls['manageStakeholders'].setValue(this.workpackModel.manageStakeholders);
    this.formGroupWorkpackModel.controls['personPossibleRoles'].setValue(this.workpackModel.personPossibleRoles);
    this.formGroupWorkpackModel.controls['orgPossibleRoles'].setValue(this.workpackModel.orgPossibleRoles);

    this.CleanPropertyProfilesFormArrays();
    if (this.workpackModel.propertyProfiles !== undefined) {
      this.workpackModel.propertyProfiles
        .sort((a,b) => {
          return (a.sortIndex < b.sortIndex) ? -1 : 1;
        })
        .forEach(pProfile => {
        (this.formGroupWorkpackModel.get('propertyProfiles') as FormArray).push(
          this.fb.group({
            toDelete: [false],
            editing: [false],
            id: [pProfile.id],
            name: [pProfile.name, Validators.required],
            type: [pProfile.type],
            using: [pProfile.using],
            sortIndex: [pProfile.sortIndex],
            value: [pProfile.value],
            min: [pProfile.min],
            max: [pProfile.max],
            custom: [pProfile.custom],
            possibleValues: [pProfile.possibleValues],
            label: [pProfile.label],
            rows: [pProfile.rows],
            fullLine: [pProfile.fullLine],
            isRequired: [pProfile.required],
            localityType: [pProfile.localityType]
          })
        );
      });

      console.log('this.formGroupWorkpackModel', this.formGroupWorkpackModel);

    }
  }

  UserChangedSomething(val): Boolean {
    if (val.name != this.workpackModel.name) return true;
    if (val.manageStakeholders != this.workpackModel.manageStakeholders) return true;
    if (val.personPossibleRoles.toString().split(',')
        .forEach((role, i) => {
          return (role != this.workpackModel.personPossibleRoles[i]) 
        })) return true;
    if (val.orgPossibleRoles.toString().split(',')
        .forEach((role, i) => {
          return (role != this.workpackModel.orgPossibleRoles[i]) 
        })) return true;
    let changed = false;
    if (val.propertyProfiles !== undefined) {
      val.propertyProfiles.forEach((pProfile, i) => {
        if (pProfile.id == '') changed = true;
        if (pProfile.toDelete) changed = true;
        if (this.PropertyProfileChanged(pProfile)) changed = true;
      });
    }
    return changed;
  }

  PropertyProfileChanged(prop): Boolean {
    let foundIndex = this.workpackModel.propertyProfiles.findIndex(p => p.name == prop.name);
    return (
      (foundIndex == -1) ||
      (this.workpackModel.propertyProfiles[foundIndex].custom != prop.custom) ||
      (this.workpackModel.propertyProfiles[foundIndex].max != prop.max)  ||
      (this.workpackModel.propertyProfiles[foundIndex].min != prop.min)  ||
      (this.workpackModel.propertyProfiles[foundIndex].name != prop.name)  ||
      (this.workpackModel.propertyProfiles[foundIndex].possibleValues != prop.possibleValues) ||
      (this.workpackModel.propertyProfiles[foundIndex].sortIndex != prop.sortIndex) ||
      (this.workpackModel.propertyProfiles[foundIndex].type != prop.type) ||
      (this.workpackModel.propertyProfiles[foundIndex].using != prop.using) ||
      (this.workpackModel.propertyProfiles[foundIndex].value != prop.value) ||
      (this.workpackModel.propertyProfiles[foundIndex].label != prop.label) ||
      (this.workpackModel.propertyProfiles[foundIndex].rows != prop.rows) ||
      (this.workpackModel.propertyProfiles[foundIndex].fullLine != prop.fullLine) ||
      (this.workpackModel.propertyProfiles[foundIndex].required != prop.isRequired) || 
      (this.workpackModel.propertyProfiles[foundIndex].localityType != prop.localityType)
    );
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

  FlattenTree(root: WorkpackModel, ident: number){
    root.components.forEach(model => {
      if (this.flatTree.findIndex(item => {
        return (item.id == model.id);
      }) == -1) {
        this.flatTree.push({
          id: model.id,
          ident: ident,
          label: '&nbsp;&nbsp;'.repeat(ident) + model.name
        });
        this.FlattenTree(model, ident+1);
      }
    });
  }

  ReuseModel(id: String) {
    let model2Reuse = new WorkpackModel();
    model2Reuse.id = id;
    this.workpackModel.components.push(model2Reuse);
    this.workpackDataService
      .UpdateWorkpackModel(this.workpackModel)
      .subscribe(() => {
        this.viewOptions.action = 'edit';
        this.router.navigate([
          './workpackmodel/'+ this.viewOptions.action + 
          '/' + this.workpackModel.id]);
      });
  }


  GetPropertyLogo(type: String): {source: String, set: String, icon: String} {
    let code4TypeNotFound = {
      'source': 'mat-icon',
      'set': 'fas',
      'icon': 'fa-question'
    }
    let logoHTMLMap: {
      type:String;
      target: {source: String, set: String, icon: String};
    }[] = [
      {'type':'Number',         'target':{'source': 'font',    'set': '',   'icon': '.0'}},
      {'type':'Text',           'target':{'source': 'font',    'set': '',   'icon': 'T'}},
      {'type':'Currency',       'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-dollar-sign'}},
      {'type':'Measure',        'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-tachometer-alt'}},
      {'type':'Text area',      'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-align-justify'}},
      {'type':'Integer',        'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-hashtag'}},
      {'type':'Email',          'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-at'}},
      {'type':'Number list',    'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-sort-numeric-down'}},
      {'type':'Date',           'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-calendar'}},
      {'type':'Selection',      'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-list-ul'}},
      {'type':'Locality list',  'target':{'source': 'mat-icon','set': 'fas','icon': 'fa-map-marker-alt'}},
    ];
    let typeFound = logoHTMLMap.find(elem => elem.type == type);
    return (typeFound) ? typeFound.target : code4TypeNotFound;
  }


  AddPropertyProfile(type: String) {
    (this.formGroupWorkpackModel.get('propertyProfiles') as FormArray).push(
      this.fb.group({
        toDelete: [false],
        editing: [true],
        id: [''],
        isRequired: [false],
        name: ['', Validators.required],
        type: [type],
        using: [true],
        sortIndex: [''],
        value: [''],
        min: [''],
        max: [''],
        custom: [true],
        possibleValues: [[]],
        label: [''],
        rows: [1],
        fullLine: [false],
        localityType: [LocalityType.ANY]
      })
    );
  }

  EditProperty(index) {
    (this.formGroupWorkpackModel.get("propertyProfiles") as FormArray)
      .at(index)
      .get('editing')
      .setValue(true);
  }

  StopEditing(index) {
    (this.formGroupWorkpackModel.get("propertyProfiles") as FormArray)
      .at(index)
      .get('editing')
      .setValue(false);
  }

  ClosePropertiesPanel() {
    (this.formGroupWorkpackModel.get("propertyProfiles") as FormArray)
      .controls
      .forEach((propCtrl) => {
        propCtrl.get('editing').setValue(false);
      });
    this.viewOptions.propertiesPanelOpenState = false;
  }


  CloseStakeholdersPanel() {
    this.viewOptions.stakeholdersPanelOpenState = false;
  }
  
  DeleteProperty(index, type) {
    let props = (this.formGroupWorkpackModel.get("propertyProfiles") as FormArray);
    let prop = props.at(index);

    if (prop.value.id != '') {
      prop.get('toDelete').setValue(true);
    }
    else {
      // remove the chosen row
      props.removeAt(index);
    }
  }

  onSubmit(){
    this.workpackModel.id = (this.workpackModel.id == 'new') ? '' : this.workpackModel.id;
    this.workpackModel.name = this.formGroupWorkpackModel.value.name.trim();
    this.workpackModel.manageStakeholders = this.formGroupWorkpackModel.value.manageStakeholders;
    this.workpackModel.personPossibleRoles = this.formGroupWorkpackModel.value.personPossibleRoles.toString().split(',');
    this.workpackModel.orgPossibleRoles = this.formGroupWorkpackModel.value.orgPossibleRoles.toString().split(',');
    while (this.workpackModel.propertyProfiles.length > 0) {
      this.workpackModel.propertyProfiles.pop();
    }
    this.formGroupWorkpackModel.get('propertyProfiles').value.forEach(pProfile => {
      pProfile.possibleValues = pProfile.possibleValues.toString().split(',');
      
      let newPropertyProfile = new PropertyProfile();
      newPropertyProfile.id = (pProfile.id == 'new') ? '' : pProfile.id;
      newPropertyProfile.toDelete = pProfile.toDelete;
      newPropertyProfile.custom = pProfile.custom;
      newPropertyProfile.max = pProfile.max;
      newPropertyProfile.min = pProfile.min;
      newPropertyProfile.name = pProfile.name;
      newPropertyProfile.possibleValues = pProfile.possibleValues;
      newPropertyProfile.sortIndex = pProfile.sortIndex;
      newPropertyProfile.type = pProfile.type;
      newPropertyProfile.using = pProfile.using;
      newPropertyProfile.value = pProfile.value;
      newPropertyProfile.label = pProfile.label;
      newPropertyProfile.rows = pProfile.rows;
      newPropertyProfile.fullLine = pProfile.fullLine;
      newPropertyProfile.required = pProfile.isRequired;
      newPropertyProfile.localityType = pProfile.localityType;
      this.workpackModel.propertyProfiles.push(newPropertyProfile);
    });

    switch (this.viewOptions.action) {
      case 'new2planstructure': {
        this.planStructure.workpackModels.push(this.workpackModel);
        this.subscriptions.push(
          this.PlanDataService
          .UpdatePlanStructure(this.planStructure)
          .subscribe(
            () => {
              this.router.navigate([
                './planstructure/edit/' + this.planStructure.id]);
            }
          )
        );
        break;
      }
      case 'new2workpackmodel': {
        this.viewOptions = this.route.snapshot.data.workpackmodel;
        this.subscriptions.push(
          this.workpackDataService.GetWorkpackModelById(this.viewOptions.arrIds[0])
          .subscribe(parentWPT => {
            parentWPT.components.push(this.workpackModel);
            this.subscriptions.push(
              this.workpackDataService
              .UpdateWorkpackModel(parentWPT)
              .subscribe(
                () => {
                  this.router.navigate([
                    './workpackmodel/edit/' + parentWPT.id]);
                }
              )
            );
          })
        );
        break;
      }
      case 'edit': {
        this.subscriptions.push(
          this.workpackDataService
          .UpdateWorkpackModel(this.workpackModel)
          .subscribe(
            wt => {
              this.workpackModel = wt;
              this.LoadFormControls();
              this.ShowMessage();
              window.setTimeout(
                () => {this.HideMessage();}, 
                3000);
              this.crumbService.SetCurrentWorkpackModel(wt);
            }
          )
        );
      }
    }
  }

  DeleteWorkpackModel(id: string) {
    this.subscriptions.push(
      this.workpackDataService.GetWorkpackModelById(id)
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
                action: this.localeConfig['YES_NO']
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
                        this.workpackDataService.QueryWorkpackModelById(this.workpackModel.id)
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
