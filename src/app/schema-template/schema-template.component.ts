import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { SchemaTemplate } from '../model/schema-template';
import { Useful } from '../useful';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-schema-template',
  templateUrl: './schema-template.component.html',
  styleUrls: ['./schema-template.component.css']
})
export class SchemaTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService ) {}

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;

  ngOnInit() {

    this.subscriptions.push(
      this.dataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
        this.SetPanels(this.route.snapshot.paramMap.get('action'));
        this.title += ' ' + st.name;
        this.crumbService.SetCurrentSchemaTemplate(st);
      })
    );

    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
  }

  SetPanels(action: String) {
    this.action = action;
    this.title = (action == 'new') ? 'New Schema Template' : 'Edit';
    this.showForm = ((action != 'children') && (action.slice(0,6) != 'delete'));
    this.showChildren = (action != 'edit')
  }

  SetTrimmedNameAndShortName(value: String){
    this.schemaTemplate.name = this.useful.GetTrimmedName(value);
    this.schemaTemplate.shortName = this.useful.GetShortName(this.schemaTemplate.name);
  }

  onSubmit(){
    this.schemaTemplate.name = this.schemaTemplate.name.trim();
    this.schemaTemplate.shortName = this.useful.GetShortName(this.schemaTemplate.shortName);
    if (this.action == 'new') {
      this.office.schemaTemplates.push(this.schemaTemplate);
      this.subscriptions.push(
        this.dataService
        .UpdateOffice(this.office)
        .subscribe(
          ret => {
            this.router.navigate(['./officeadmin/children/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./officeadmin/children/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.dataService
        .UpdateSchemaTemplate(this.schemaTemplate)
        .subscribe(
          ret => {
            this.router.navigate(['./officeadmin/children/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./officeadmin/children/' + this.office.id]); 
          }
        )
      );
    }
  }

  DeleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete " + workpackTemplate2delete.name + " because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpackTemplate2delete.name + "?")) {
          this.dataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.dataService.QuerySchemaTemplateById(this.schemaTemplate.id);
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
