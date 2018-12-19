import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Workpack } from 'src/app/model/workpack';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkpackDataService } from 'src/app/services/data/workpack/workpack-data.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RoleCategory, ActorType, Role, ScopeType } from 'src/app/model/role';
import { Org } from 'src/app/model/org';
import { RoleDataService } from 'src/app/services/data/role/role-data.service';
import { OrgDataService } from 'src/app/services/data/org/org-data.service';
import { Actor } from 'src/app/model/actor';
import { Scope } from 'src/app/model/scope';

@Component({
  selector: 'app-org-role',
  templateUrl: './org-role.component.html',
  styleUrls: ['./org-role.component.css']
})
export class OrgRoleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private workpackDataService: WorkpackDataService,
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private roleDataService: RoleDataService,
    private orgDataService: OrgDataService) { }

  subscriptions: Subscription[] = [];

  workpack: Workpack = new Workpack();
  role: Role = new Role();

  orgsSearched: Org[] = [];
  selectedOrg: Org = new Org();

  propertiesPanelOpenState = true;

  title = "";

  roleId: String = '';

  possibleRoles: String[] = [];

  SaveButtonBottomPosition: String;
  MessageRightPosition: String;

  formGroup = this.fb.group({
    id: [''],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    actorId: [''],
    actorName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    actorFullName: [''],
    actorPhone: [''],
    actorAddress: [''],
    actorUserName: [''],
    actorEmail: ['']
  });



  ngOnInit() {

    this.roleId = this.route.snapshot.paramMap.get('id');

    if (this.roleId = 'new'){
      this.title = "New Stakeholder";
      this.role.actor = new Org();
    }
    else {
      this.subscriptions.push(
        this.roleDataService.role.subscribe(role =>{
          this.role = role;
          this.subscriptions.push(
            this.orgDataService.GetOrgById(this.role.id).subscribe(
              res => {
                this.selectedOrg = res;
                this.LoadFormControls();
              }
            )
          );
        })
      );
    }

    this.subscriptions.push(
      this.workpackDataService.workpack.subscribe(wp =>{
        this.workpack = wp;
        this.role.scope = this.workpack;
        this.possibleRoles = wp.model.orgPossibleRoles;
        console.log('wo',wp);
      })
    );

    this.subscriptions.push(
      this.orgDataService.orgs.subscribe(orgs =>{
        this.orgsSearched = orgs;
      })
    );


    this.subscriptions.push(    
      this.formGroup.controls['actorName'].statusChanges.subscribe((status) => {
        if (status == 'VALID') {
          this.SearchOrg(this.formGroup.value.actorName);
        }
        else {
          this.orgsSearched = [];
          this.CleanOrgControl();
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


  //Load role form conroles
  LoadFormControls() {
    this.formGroup.controls['name'].setValue(this.role.name);
    this.formGroup.controls['actorId'].setValue(this.selectedOrg.id);
    this.formGroup.controls['actorFullName'].setValue(this.selectedOrg.fullName);
    this.formGroup.controls['actorPhone'].setValue(this.selectedOrg.phone);
    this.formGroup.controls['actorAddress'].setValue(this.selectedOrg.address);
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.role.name) return true;
    if (val.actorId != this.role.actor.id) return true;
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

  SearchOrg(name: string) {
    this.orgDataService.QueryOrgsByName(name);
  }

  UpdateOrgControl(orgFound: Org) {
    this.selectedOrg = orgFound;
    this.formGroup.controls['actorId'].setValue(orgFound.id);
    this.formGroup.controls['actorFullName'].setValue(orgFound.fullName);
    this.formGroup.controls['actorPhone'].setValue(orgFound.phone);
    this.formGroup.controls['actorAddress'].setValue(orgFound.address);
  }

  CleanOrgControl() {
    this.formGroup.controls['actorId'].setValue('');
    this.formGroup.controls['actorFullName'].setValue('');
    this.formGroup.controls['actorPhone'].setValue('');
    this.formGroup.controls['actorAddress'].setValue('');
    this.formGroup.controls['actorEmail'].setValue('');
  }


  ////////////////////////////////////////////////////////////////////////
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.role.name = this.formGroup.value.name.trim();
    this.role.actorType = ActorType.organization;
    this.role.category = RoleCategory.business;
    this.role.scopeType = ScopeType.workpack;
    let actor: Actor = this.selectedOrg as Actor; // new Actor();
    this.role.actor = actor;
    let scope: Scope = this.workpack as Scope; // new Scope();
    this.role.scope = scope;

    if (this.roleId == 'new') {
      this.role.id = null;
      this.subscriptions.push(
        this.roleDataService.SaveRole(this.role).subscribe(
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
        this.roleDataService.UpdateRole(this.role).subscribe(
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
