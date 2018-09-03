import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { SchemaTemplate } from '../model/schema-template';
import { Useful } from '../useful';

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
    private router: Router ) { }

  subscriptions: Subscription[] = [];
  office: Office;
  schemaTemplate: SchemaTemplate;
  schemaTemplateId: String;
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;

  ngOnInit() {
    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    this.schemaTemplateId = this.route.snapshot.paramMap.get('id');

    if (this.action == 'new') {
      this.schemaTemplate = new SchemaTemplate();
    }
    else
    {
      this.dataService.QuerySchemaTemplateById(this.schemaTemplateId);
      this.subscriptions.push(
        this.dataService.schemaTemplate.subscribe(st =>{
          this.schemaTemplate = st;
          console.log('st',st);
        })
      );
    }
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
  }

  SetPanels(action: String) {
    this.action = action;
    this.showForm = (action != 'children');
    this.showChildren = ((action != 'children') || (action != 'detail'))
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
          () => {
            this.router.navigate(['./office/children/' + this.office.id]); 
          }
        )
      );
    }
  }

  deleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete this template because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpackTemplate2delete.name + "?")) {
          this.dataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.router.navigate (['./schematemplate/children/' + this.schemaTemplate.id]);
            }
          );
        }
      })      
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
