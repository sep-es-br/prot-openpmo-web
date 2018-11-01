import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../../model/office';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Useful } from '../../useful';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private breadcrumbService: BreadcrumbService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService,
    private fb: FormBuilder) { }

    formGroupOffice = this.fb.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required]
    });
  

  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];
  propertiesPanelOpenState: Boolean = false;
  schemasPanelOpenState: Boolean = true;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;


  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.schemasPanelOpenState = false;
    } 
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
        this.formGroupOffice.controls['name'].setValue(this.office.name);
        this.formGroupOffice.controls['shortName'].setValue(this.office.shortName);
        this.HideSaveButton();     
      })
    );

    this.formGroupOffice.statusChanges.subscribe(status => {
      return (status == 'VALID' && this.UserChangedSomething(this.formGroupOffice.value)) 
      ? this.ShowSaveButton() 
      : this.HideSaveButton();
    });

    this.HideMessage();

    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  UserChangedSomething(val): Boolean {
    if (val.name != this.office.name) return true;
    if (val.shortName != this.office.shortName) return true;
  }  

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



  onSubmit(){
    this.office.name = this.office.name.trim();
    this.office.shortName = this.office.shortName.trim();

    this.office.name = this.formGroupOffice.value.name.trim();
    this.office.shortName = this.useful.GetShortName(this.formGroupOffice.value.shortName);

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
        }
      )
    );
  }

  DeleteSchema(id: string) {
    this.schemaDataService.GetSchemaById(id).subscribe(schema2delete => {
      if (schema2delete.workpacks.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schema2delete.name + "?")) {
        this.schemaDataService.DeleteSchema(id).subscribe(
          () => {
            this.officeDataService.QueryOfficeById(this.office.id);
            this.router.navigate (['./office/' + this.action + '/' + this.office.id]);
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
