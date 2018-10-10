import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { Useful } from '../useful';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-office-admin',
  templateUrl: './office-admin.component.html',
  styleUrls: ['./office-admin.component.css']
})
export class OfficeAdminComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private breadcrumbService: BreadcrumbService,
    private useful: Useful,
    private router: Router) { }

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
  schemaTemplatesPanelOpenState: Boolean = true;


  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  DeleteSchemaTemplate(id: string) {
    this.dataService.GetSchemaTemplateById(id).subscribe(schemaTemplate2delete => {
      if (schemaTemplate2delete.workpackTemplates.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schemaTemplate2delete.name + "?")) {
        this.dataService.DeleteSchemaTemplate(id).subscribe(
          () => {
            this.dataService.QueryOfficeById(this.office.id).subscribe(res => res);
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
