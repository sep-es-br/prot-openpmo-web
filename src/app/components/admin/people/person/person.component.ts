import { Component, OnInit, Input } from '@angular/core';
import { PersonDataService } from 'src/app/services/data/person/person-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateConstants } from 'src/app/model/translate';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(
    private personDataService: PersonDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //Constants for translate
  translate = new TranslateConstants();

  formGroupPerson = this.fb.group({
    name: ['', Validators.required],
    fullName: ['', Validators.required],
    address: [''],
    phone: [''],
    userName: ['']
  });

  subscriptions: Subscription[] = [];
  person: Person;
  paramId: string;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;
  propertiesPanelOpenState: Boolean = true;


  ngOnInit() {
    this.paramId = this.route.snapshot.paramMap.get('id');

    if (this.paramId == 'new') {
      this.person = new Person;
    }
    else if (!isNaN(parseInt(this.paramId))) {
      this.subscriptions.push(
        this.personDataService.QueryPersonById(this.paramId).subscribe(
          (res) => {
            this.person = res as Person;
            this.LoadFormControls();
          }
        )
      );
    }

    this.subscriptions.push(    
      this.formGroupPerson.statusChanges.subscribe((status) => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupPerson.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );


  }

  //Load property form
  LoadFormControls() {
    this.formGroupPerson.controls['name'].setValue(this.person.name);
    this.formGroupPerson.controls['fullName'].setValue(this.person.fullName);
    this.formGroupPerson.controls['address'].setValue(this.person.address);
    this.formGroupPerson.controls['phone'].setValue(this.person.phone);
    this.formGroupPerson.controls['userName'].setValue(this.person.userName);
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.person.name) return true;
    if (val.fullName != this.person.fullName) return true;
    if (val.address != this.person.address) return true;
    if (val.phone != this.person.phone) return true;
    if (val.userName != this.person.userName) return true;
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


  ////////////////////////////////////////////////////////////////////////
  // EXPORT TO THE DATABASE
  //
  // Export the information to be saved to the database after pressing the save button
  //
  onSubmit(){
    this.person.name = this.formGroupPerson.value.name.trim();
    this.person.fullName = this.formGroupPerson.value.fullName.trim();
    this.person.address = this.formGroupPerson.value.address.trim();
    this.person.phone = this.formGroupPerson.value.phone.trim();
    this.person.userName = this.formGroupPerson.value.userName.trim();
    
    switch (this.paramId) {
      case 'new': {
        this.person.id = null;
        this.subscriptions.push(
          this.personDataService
          .SavePerson(this.person)
          .subscribe(
            () => {
              this.router.navigate([
                './people/']);
            }
          )
        );
        break;
      }
      default: {
        this.subscriptions.push(
          this.personDataService.UpdatePerson(this.person)
            .subscribe(
              () => {
                this.router.navigate([
                  './people/']);
              }
            )
        );
        break;
      }
    }
  }

}
