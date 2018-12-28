import { Component, OnInit, Input } from '@angular/core';
import { PersonDataService } from 'src/app/services/data/person/person-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/model/person';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocaleService } from 'src/app/services/locale/locale-service.service';
import { AppComponent } from 'src/app/app.component';
import { StringFilter } from 'src/app/pipes/string-filter';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  localeConfig: Object = new Object();
  
  constructor(
    private personDataService: PersonDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private breadCrumbService: BreadcrumbService,
    private localeService: LocaleService,
    private app: AppComponent,
    private string_filter: StringFilter
  ) { }

  formGroupPerson = this.fb.group({
    name: ['', Validators.required],
    fullName: ['', Validators.required],
    address: [''],
    phone: [''],
    userName: [''],
    resetPassword: [false],
    newPassword:[''],
    confirmNewPassword: ['']
  });

  subscriptions: Subscription[] = [];
  person: Person;
  paramId: string;
  phone_test:string;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;
  propertiesPanelOpenState: Boolean = true;
  teste_phone:any="";

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

    this.paramId = this.route.snapshot.paramMap.get('id');

    if (this.paramId == 'new') {
      this.person = new Person;
      this.breadCrumbService.UpdateBreadcrumb({id: "new", name: "New person"}, 'person');
    }
    else if (!isNaN(parseInt(this.paramId))) {
      this.subscriptions.push(
        this.personDataService.QueryPersonById(this.paramId).subscribe(
          (res) => {
            this.person = res as Person;
            this.breadCrumbService.UpdateBreadcrumb(this.person, 'person');
            this.LoadFormControls();
          }
        )
      );
    }

    this.subscriptions.push(    
      this.formGroupPerson.statusChanges.subscribe((status) => {
        return (status == 'VALID' && 
                this.UserChangedSomething(this.formGroupPerson.value) && 
                this.PasswordIsOK()) 

                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );

    // this.subscriptions.push(    
    //   this.formGroupPerson.controls['phone'].statusChanges.subscribe((value) => {
    //     this.formGroupPerson.controls['phone'].setValue(this.phone_pipe.transform(value,' ()+-/0123456789'));
    //   })
    // );

  }
  
  teste(){
    this.teste_phone = this.formGroupPerson.controls['phone']
    this.teste_phone = this.teste_phone as string
    return this.string_filter.transform(this.teste_phone,' ()+-/0123456789');
  }

  PasswordIsOK(): Boolean {
    if (!this.formGroupPerson.value.resetPassword) {
      this.formGroupPerson.controls['newPassword'].setValidators(null);
      this.formGroupPerson.controls['confirmNewPassword'].setValidators(null);
      return true;
    }
    else {
      this.formGroupPerson.controls['newPassword'].setValidators(Validators.required);
      this.formGroupPerson.controls['confirmNewPassword'].setValidators(Validators.required);
      return (this.formGroupPerson.value.newPassword != '' &&
              this.formGroupPerson.value.newPassword == this.formGroupPerson.value.confirmNewPassword)
    }
    
  }

  //Load property form
  LoadFormControls() {
    this.formGroupPerson.controls['name'].setValue("" + this.person.name);
    this.formGroupPerson.controls['fullName'].setValue("" + this.person.fullName);
    this.formGroupPerson.controls['address'].setValue("" + this.person.address);
    this.formGroupPerson.controls['phone'].setValue("" + this.person.phone);
    this.formGroupPerson.controls['userName'].setValue("" + this.person.userName);
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.person.name) return true;
    if (val.fullName != this.person.fullName) return true;
    if (val.address != this.person.address) return true;
    if (val.phone != this.person.phone) return true;
    if (val.userName != this.person.userName) return true;
    if (val.resetPassword) return true;
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
    if (this.formGroupPerson.value.resetPassword && 
        this.formGroupPerson.value.newPassword == this.formGroupPerson.value.confirmNewPassword &&
        this.formGroupPerson.value.newPassword != '') {
      this.person.password = this.formGroupPerson.value.newPassword;
    }
    
    switch (this.paramId) {
      case 'new': {
        this.person.id = null;
        this.subscriptions.push(
          this.personDataService
          .SavePerson(this.person)
          .subscribe(
            () => {
              this.router.navigate([
                './person']);
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
                  './person']);
              }
            )
        );
        break;
      }
    }
  }

}
