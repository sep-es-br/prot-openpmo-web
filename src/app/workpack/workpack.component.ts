import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Panel } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { Schema } from '../model/schema';
import { Workpack } from '../model/workpack';
import { Useful } from '../useful';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';
import { WorkpackTemplate } from '../model/workpack-template';

@Component({
  selector: 'app-workpack',
  templateUrl: './workpack.component.html',
  styleUrls: ['./workpack.component.css']
})
export class WorkpackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router, 
    private crumbService: BreadcrumbService) {
    }

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schema: Schema = new Schema();
  workpack: Workpack = new Workpack();
  workpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  parent: any;
  id: String;
  possibleTemplates: WorkpackTemplate[] = [];
  panel: Panel;

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.panel.subscribe(p => {
        this.panel = p;
      })
    );

    this.subscriptions.push(
      this.dataService.workpackTemplate.subscribe(wt => {
        this.workpackTemplate = wt;
      })
    );
    
    this.subscriptions.push(
      this.dataService.workpack.subscribe(wp =>{
        if (wp.id != '') {
          if (this.panel.action == 'new2workpack') {
            this.parent = wp;
            this.workpack = new Workpack();
            this.subscriptions.push(
              this.dataService.GetWorkpackTemplateById(wp.template.id).subscribe(wptemp => {
                this.possibleTemplates = wptemp.components;
              })
            );
          }
          else{
            this.workpack = wp;
            this.crumbService.SetCurrentWorkpack(wp);
          }
        }
      })
    );

    this.subscriptions.push(
      this.dataService.schema.subscribe(s => {
        this.schema = s;
        if (s.id != '')
          if (this.panel.action == 'new2schema') {
            this.parent = s;
            this.workpack = new Workpack();
            this.subscriptions.push(
              this.dataService.GetSchemaTemplateById(s.template.id).subscribe(stemp => {
                this.possibleTemplates = stemp.workpackTemplates;
              })
            );
          }
        }
      )
    );

    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
    
  }

  SetTrimmedNameAndShortName(value: String){
    this.workpack.name = this.useful.GetTrimmedName(value);
    this.workpack.shortName = this.useful.GetShortName(this.workpack.name);
  }

  onSubmit(){
    this.workpack.name = this.workpack.name.trim();
    this.workpack.shortName = this.useful.GetShortName(this.workpack.shortName);
    
    switch (this.panel.action) {
      case 'new2schema': {
        this.schema.workpacks.push(this.workpack);
        this.subscriptions.push(
          this.dataService
          .UpdateSchema(this.schema)
          .subscribe(
            () => {
              this.panel.action = 'children';
              this.router.navigate(['./schema/'+ this.panel.action + '/' + this.schema.id]);
            }
          )
        );
        break;
      }
      case 'new2workpack': {
        this.parent.components.push(this.workpack);
        this.subscriptions.push(
          this.dataService
          .UpdateWorkpack(this.parent)
          .subscribe(
            () => {
              this.panel.action = 'children';
              this.router.navigate(['./workpack/'+ this.panel.action + '/' + this.parent.id]);
            }
          )
        );
        break;
      }
      case 'edit': {
        let parentRoute: String;
        // if my parent is a schema...
        parentRoute = (this.schema.id == this.parent.id) ? 'schema' : 'workpack';
        this.subscriptions.push(
          this.dataService
          .UpdateWorkpack(this.workpack)
          .subscribe(
            () => {
              this.router.navigate([
                './' + parentRoute + 
                '/children/' + this.parent.id]);
            }
          )
        );
      }
    }
  }

  DeleteWorkpack(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackById(id)
      .subscribe(workpack2delete => {
        if (workpack2delete.components.length > 0) {
          alert("Sorry, you can not delete this workpack because it contains workpacks.")
        }
        else if(confirm("Are you sure you want to delete " + workpack2delete.name + "?")) {
          this.dataService.DeleteWorkpack(id).subscribe(
            () => {
              this.dataService.QueryWorkpackById(this.workpack.id);
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
