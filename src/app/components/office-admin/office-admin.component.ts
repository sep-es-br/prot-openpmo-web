import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../../model/office';
import { Useful } from '../../useful';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';

@Component({
  selector: 'app-office-admin',
  templateUrl: './office-admin.component.html',
  styleUrls: ['./office-admin.component.css']
})
export class OfficeAdminComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private breadcrumbService: BreadcrumbService,
    private useful: Useful,
    private router: Router) { }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  fullNameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];
  schemaTemplatesPanelOpenState: Boolean = true;

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Preparing data before loading screen
  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );
    //Updating path traveled by the user
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Schema Template
  //
  //Identification Parameter: id
  //
  DeleteSchemaTemplate(id: string) {
    this.schemaDataService.GetSchemaTemplateById(id).subscribe(schemaTemplate2delete => {
      if (schemaTemplate2delete.workpackTemplates.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schemaTemplate2delete.name + "?")) {
        this.schemaDataService.DeleteSchemaTemplate(id).subscribe(
          () => {
            this.officeDataService.QueryOfficeById(this.office.id).subscribe(res => res);
          }
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
