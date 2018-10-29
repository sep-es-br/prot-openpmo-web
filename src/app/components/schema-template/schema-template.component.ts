import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../../model/office';
import { SchemaTemplate } from '../../model/schema-template';
import { Useful } from '../../useful';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { FormControl, Validators } from '@angular/forms';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';

@Component({
  selector: 'app-schema-template',
  templateUrl: './schema-template.component.html',
  styleUrls: ['./schema-template.component.css']
})
export class SchemaTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private schemaDataService: SchemaDataService,
    private workpackDataService: WorkpackDataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService ) {}

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  shortNameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  propertiesPanelOpenState: Boolean = false;
  workpackTemplatesPanelOpenState: Boolean = true;  

  ngOnInit() {
    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.workpackTemplatesPanelOpenState = false;
    }     

    this.subscriptions.push(
      this.schemaDataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
      })
    );

    this.subscriptions.push(
      this.officeDataService.office.subscribe(o =>{
        this.office = o;
      })
    );
  }

  SetPanels(action: String) {
    this.action = action;
    this.title = (action == 'new') ? 'New Schema Template' : '';
  }

  onSubmit(){
    this.schemaTemplate.name = this.schemaTemplate.name.trim();
    this.schemaTemplate.shortName = this.useful.GetShortName(this.schemaTemplate.shortName);
    if (this.action == 'new') {
      this.office.schemaTemplates.push(this.schemaTemplate);
      this.subscriptions.push(
        this.officeDataService
        .UpdateOffice(this.office)
        .subscribe(
          ret => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.schemaDataService
        .UpdateSchemaTemplate(this.schemaTemplate)
        .subscribe(
          ret => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./officeadmin/edit/' + this.office.id]); 
          }
        )
      );
    }
  }

  DeleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.workpackDataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete " + workpackTemplate2delete.name + " because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpackTemplate2delete.name + "?")) {
          this.workpackDataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.schemaDataService.QuerySchemaTemplateById(this.schemaTemplate.id).subscribe(res => res);
            }
          );
        }
      })
    );
  }


  ngOnDestroy() {
    this.crumbService.CleanSchemaTemplate();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}