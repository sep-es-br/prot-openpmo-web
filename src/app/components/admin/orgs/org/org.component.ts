import { Component, OnInit, Input } from '@angular/core';
import { OrgDataService } from 'src/app/services/data/org/org-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Org } from 'src/app/model/org';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateConstants } from 'src/app/model/translate';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {

  constructor(
    private orgDataService: OrgDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //Constants for translate
  translate = new TranslateConstants();

  formGroupOrg = this.fb.group({
    name: ['', Validators.required],
    fullName: ['', Validators.required],
    address: [''],
    phone: [''],
    sector: [''],
  });

  subscriptions: Subscription[] = [];
  org: Org;
  paramId: string;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;
  propertiesPanelOpenState: Boolean = true;


  ngOnInit() {
    this.paramId = this.route.snapshot.paramMap.get('id');

    if (this.paramId == 'new') {
      this.org = new Org;
    }
    else if (!isNaN(parseInt(this.paramId))) {
      this.subscriptions.push(
        this.orgDataService.QueryOrgById(this.paramId).subscribe(
          (res) => {
            this.org = res as Org;
            this.LoadFormControls();
          }
        )
      );
    }

    this.subscriptions.push(    
      this.formGroupOrg.statusChanges.subscribe((status) => {
        return (status == 'VALID' && this.UserChangedSomething(this.formGroupOrg.value)) 
                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );


  }

  //Load property form
  LoadFormControls() {
    this.formGroupOrg.controls['name'].setValue(this.org.name);
    this.formGroupOrg.controls['fullName'].setValue(this.org.fullName);
    this.formGroupOrg.controls['address'].setValue(this.org.address);
    this.formGroupOrg.controls['phone'].setValue(this.org.phone);
    this.formGroupOrg.controls['sector'].setValue(this.org.sector);
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.org.name) return true;
    if (val.fullName != this.org.fullName) return true;
    if (val.address != this.org.address) return true;
    if (val.phone != this.org.phone) return true;
    if (val.sector != this.org.sector) return true;
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
    this.org.name = this.formGroupOrg.value.name.trim();
    this.org.fullName = this.formGroupOrg.value.fullName.trim();
    this.org.address = this.formGroupOrg.value.address.trim();
    this.org.phone = this.formGroupOrg.value.phone.trim();
    this.org.sector = this.formGroupOrg.value.sector;
    
    switch (this.paramId) {
      case 'new': {
        this.org.id = null;
        this.subscriptions.push(
          this.orgDataService
          .SaveOrg(this.org)
          .subscribe(
            () => {
              this.router.navigate([
                './orgs/']);
            }
          )
        );
        break;
      }
      default: {
        this.subscriptions.push(
          this.orgDataService.UpdateOrg(this.org)
            .subscribe(
              () => {
                this.router.navigate([
                  './orgs/']);
              }
            )
        );
        break;
      }
    }
  }

}
