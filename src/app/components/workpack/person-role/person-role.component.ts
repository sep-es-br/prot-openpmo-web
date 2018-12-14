import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Workpack } from 'src/app/model/workpack';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkpackDataService } from 'src/app/services/data/workpack/workpack-data.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RoleCategory, ActorType, Role, ScopeType } from 'src/app/model/role';
import { Person } from 'src/app/model/person';
import { RoleDataService } from 'src/app/services/data/role/role-data.service';
import { PersonDataService } from 'src/app/services/data/person/person-data.service';
import { Actor } from 'src/app/model/actor';
import { Scope } from 'src/app/model/scope';

@Component({
  selector: 'app-person-role',
  templateUrl: './person-role.component.html',
  styleUrls: ['./person-role.component.css']
})
export class PersonRoleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private workpackDataService: WorkpackDataService,
    private router: Router, 
    private crumbService: BreadcrumbService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private roleDataService: RoleDataService,
    private personDataService: PersonDataService) { }

  subscriptions: Subscription[] = [];

  workpack: Workpack = new Workpack();
  role: Role = new Role();

  peopleSearched: Person[] = [];
  selectedPerson: Person = new Person();

  propertiesPanelOpenState = true;

  title = "";

  roleId: String = '';

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
      this.role.actor = new Person();
    }
    else {
      this.subscriptions.push(
        this.roleDataService.role.subscribe(role =>{
          this.role = role;
          this.subscriptions.push(
            this.personDataService.GetPersonById(this.role.id).subscribe(
              res => {
                this.selectedPerson = res;
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
      })
    );

    this.subscriptions.push(
      this.personDataService.people.subscribe(people =>{
        this.peopleSearched = people;
      })
    );


    this.subscriptions.push(    
      this.formGroup.controls['actorName'].statusChanges.subscribe((status) => {
        if (status == 'VALID') {
          this.SearchPerson(this.formGroup.value.actorName);
        }
        else {
          this.peopleSearched = [];
          this.CleanPersonControl();
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
    this.formGroup.controls['actorId'].setValue(this.selectedPerson.id);
    this.formGroup.controls['actorFullName'].setValue(this.selectedPerson.fullName);
    this.formGroup.controls['actorPhone'].setValue(this.selectedPerson.phone);
    this.formGroup.controls['actorAddress'].setValue(this.selectedPerson.address);
    this.formGroup.controls['actorEmail'].setValue(this.selectedPerson.email);
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

  SearchPerson(name: string) {
    this.personDataService.QueryPeoplByName(name);
  }

  UpdatePersonControl(personFound: Person) {
    this.selectedPerson = personFound;
    this.formGroup.controls['actorId'].setValue(personFound.id);
    this.formGroup.controls['actorFullName'].setValue(personFound.fullName);
    this.formGroup.controls['actorPhone'].setValue(personFound.phone);
    this.formGroup.controls['actorAddress'].setValue(personFound.address);
    this.formGroup.controls['actorEmail'].setValue(personFound.email);
  }

  CleanPersonControl() {
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
    this.role.actorType = ActorType.person;
    this.role.category = RoleCategory.business;
    //this.role.id = (this.roleId == 'new') ? null : this.roleId;
    this.role.scopeType = ScopeType.workpack;
    let actor: Actor = this.selectedPerson as Actor; // new Actor();
    actor.roles = null;
    // actor.id = this.selectedPerson.id;
    // actor.address = this.selectedPerson.address;
    // actor.fullName = this.selectedPerson.fullName;
    // actor.name = this.selectedPerson.name;
    // actor.phone = this.selectedPerson.phone;
    this.role.actor = actor;

    let scope: Scope = this.workpack as Scope; // new Scope();
    scope.roles = null;
    // scope.fullName = this.workpack.fullName;
    // scope.id = this.workpack.id;
    // scope.name = this.workpack.name;
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
