import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../../model/office';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Useful } from '../../useful';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { TranslateConstants } from '../../model/translate';

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
    private router: Router) { }

  //Constants for translate
  translate = new TranslateConstants();
  
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  shortNameFormControl = new FormControl('', [
    Validators.required
  ]);

  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];
  propertiesPanelOpenState: Boolean = false;
  schemasPanelOpenState: Boolean = true;

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
      })
    );
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  onSubmit(){
    this.office.name = this.office.name.trim();
    this.office.shortName = this.office.shortName.trim();

    this.subscriptions.push(
      this.officeDataService
      .SaveOffice(this.office)
      .subscribe(
        () => {
          this.router.navigate (['./']);
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
