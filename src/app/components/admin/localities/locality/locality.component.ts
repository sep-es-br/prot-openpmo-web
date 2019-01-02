import { Component, OnInit, Input } from '@angular/core';
import { LocalityDataService } from 'src/app/services/data/locality/locality-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Locality, LocalityType } from 'src/app/model/locality';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.css']
})
export class LocalityComponent implements OnInit {

  localeConfig: any;
  
  constructor(
    private localityDataService: LocalityDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private breadCrumbService: BreadcrumbService,
    private localeService: LocaleService
  ) { }

  formGroup = this.fb.group({
    type: ['any', Validators.required],
    name: ['', Validators.required],
    fullName: [''],
    gpsLatitude: [''],
    gpsLongitude: [''],
    container: ['']
  });

  subscriptions: Subscription[] = [];
  locality: Locality;
  localities: Locality[];
  paramId: string;
  SaveButtonBottomPosition: String;
  MessageRightPosition: String;
  propertiesPanelOpenState: Boolean = true;
  localityTypes: String[] = Object.values(LocalityType);

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

    //All localities
    this.subscriptions.push(
      this.localityDataService.localities.subscribe(locs => {
        this.localities = locs.filter((locality) => {
          return (locality.id != this.paramId);
        }); 
      })
    );    



    if (this.paramId == 'new') {
      this.locality = new Locality;
      this.breadCrumbService.UpdateBreadcrumb({id: "new", name: "New locality"}, 'locality');
    }
    else if (!isNaN(parseInt(this.paramId))) {
      this.subscriptions.push(
        this.localityDataService.QueryLocalityById(this.paramId).subscribe(
          (res) => {
            this.locality = res as Locality;
            this.breadCrumbService.UpdateBreadcrumb(this.locality, 'locality');
            this.LoadFormControls();
          }
        )
      );
    }

    this.subscriptions.push(    
      this.formGroup.statusChanges.subscribe((status) => {
        return (status == 'VALID' && 
                this.UserChangedSomething(this.formGroup.value)) 

                ? this.ShowSaveButton() 
                : this.HideSaveButton();
      })
    );


  }

  //Load property form
  LoadFormControls() {
    this.formGroup.controls['type'].setValue( (this.locality.type) ? this.locality.type : 'any' );
    this.formGroup.controls['name'].setValue("" + this.locality.name);
    this.formGroup.controls['fullName'].setValue("" + this.locality.fullName);
    this.formGroup.controls['gpsLatitude'].setValue("" + this.locality.GPS_Latitude);
    this.formGroup.controls['gpsLongitude'].setValue("" + this.locality.GPS_Longitude);
    this.formGroup.controls['container'].setValue(
      (this.locality.container) ? this.locality.container.id : 'none'
    );
  }


  //Identify changes made by the user
  UserChangedSomething(val): Boolean {
    if (val.name != this.locality.name) return true;
    if (val.fullName != this.locality.fullName) return true;
    if (val.type != ((this.locality.type) ? this.locality.type : 'any' ) ) return true;
    if (val.container != ((this.locality.container) ? this.locality.container.id : 'none' ) ) return true;
    
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
    this.locality.type = (this.formGroup.value.type == 'any') ? null : this.formGroup.value.type;
    this.locality.name = this.formGroup.value.name.trim();
    this.locality.fullName = this.formGroup.value.fullName.trim();
    this.locality.GPS_Latitude = parseFloat(this.formGroup.value.gpsLatitude) as Number;
    this.locality.GPS_Longitude = parseFloat(this.formGroup.value.gpsLongitude) as Number;
    this.locality.container = (this.formGroup.value.container == 'none') 
                                ? null 
                                : this.localities.find(l => l.id == this.formGroup.value.container);;
    
    switch (this.paramId) {
      case 'new': {
        this.locality.id = null;
        this.subscriptions.push(
          this.localityDataService
          .SaveLocality(this.locality)
          .subscribe(
            () => {
              this.router.navigate([
                './locality']);
            }
          )
        );
        break;
      }
      default: {
        this.subscriptions.push(
          this.localityDataService.UpdateLocality(this.locality)
            .subscribe(
              () => {
                this.router.navigate([
                  './locality']);
              }
            )
        );
        break;
      }
    }
  }

}
