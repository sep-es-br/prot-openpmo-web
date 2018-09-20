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
import { ViewOptions } from '../model/view-options';

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
  id: String;
  viewOptions: ViewOptions;

  ngOnInit() {

    this.viewOptions = this.route.snapshot.data.workpack;

    this.subscriptions.push(
      this.dataService.workpackTemplate.subscribe(wt => {
        this.workpackTemplate = wt;
      })
    );
    
    this.subscriptions.push(
      this.dataService.workpack.subscribe(wp =>{
        this.workpack = wp;
      })
    );

    this.subscriptions.push(
      this.dataService.schema.subscribe(s => {
        this.schema = s;
      })
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
    this.workpack.template = this.workpackTemplate;
    
    switch (this.viewOptions.action) {
      case 'new2schema': {
        this.schema.workpacks.push(this.workpack);
        this.subscriptions.push(
          this.dataService
          .UpdateSchema(this.schema)
          .subscribe(
            () => {
              this.viewOptions.action = 'children';
              this.router.navigate([
                './schema/' + this.viewOptions.action + 
                '/' + this.schema.id +
                '&' + this.schema.template.id]);
            }
          )
        );
        break;
      }
      case 'new2workpack': {
        this.subscriptions.push(
          this.dataService.GetWorkpackById(this.crumbService.GetLast().id)
          .subscribe(parentWP => {
            parentWP.components.push(this.workpack);
            this.subscriptions.push(
              this.dataService
              .UpdateWorkpack(parentWP)
              .subscribe(
                () => {
                  this.viewOptions.action = 'children';
                  this.router.navigate([
                    './workpack/'+ this.viewOptions.action + 
                    '/' + parentWP.id +
                    '&' + parentWP.template.id]);
                }
              )
            );
          })
        );
        break;
      }
      case 'edit': {
        this.subscriptions.push(
          this.dataService.GetWorkpackById(this.crumbService.GetLast().id)
          .subscribe(parentWP => {
            this.subscriptions.push(
              this.dataService
              .UpdateWorkpack(this.workpack)
              .subscribe(
                () => {
                  this.router.navigate([
                    './workpack/children/' + parentWP.id +
                    '&' + parentWP.template.id]);
                }
              )
            );
          })
        )
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
          alert("Sorry, you can not delete " + workpack2delete.name + " because it is not empty.")
        }
        else if(confirm("Are you sure you want to delete " + workpack2delete.name + "?")) {
          this.dataService.DeleteWorkpack(id).subscribe(
            () => {
              this.subscriptions
              .push(this.dataService.QueryWorkpackById(this.workpack.id)
                .subscribe(wp => wp));
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
