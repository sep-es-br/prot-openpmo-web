import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { Office } from '../model/office';
import { SchemaTemplate } from '../model/schema-template';
import { WorkpackTemplate } from '../model/workpack-template';
import { Useful } from '../useful';

@Component({
  selector: 'app-workpack-template',
  templateUrl: './workpack-template.component.html',
  styleUrls: ['./workpack-template.component.css']
})
export class WorkpackTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router) { }

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  workpackTemplate: WorkpackTemplate;
  templatepath: WorkpackTemplate[] = [];
  action: String;
  id: String;

  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.id = this.route.snapshot.paramMap.get('id');
    
    if ((this.action == 'new2schematemplate') || (this.action == 'new2workpacktemplate')) {
      this.workpackTemplate = new WorkpackTemplate();
    }
    else
    {
      this.dataService.QueryWorkpackTemplateById(this.id);
      this.subscriptions.push(
        this.dataService.workpackTemplate.subscribe(wpt =>{
          this.workpackTemplate = wpt;
          console.log('wpt',wpt);
        })
      );
    }

    this.subscriptions.push(
      this.dataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
      })
    );

    this.subscriptions.push(
      this.dataService.workpackTemplate.subscribe(wt =>{
        this.workpackTemplate = wt;
      })
    );
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
  }

  SetTrimmedNameAndShortName(value: String){
    this.workpackTemplate.name = this.useful.GetTrimmedName(value);
    this.workpackTemplate.shortName = this.useful.GetShortName(this.workpackTemplate.name);
  }
  
  NewWorkpackTemplate() {
    this.action = 'new2workpacktemplate';
    this.workpackTemplate = new WorkpackTemplate();
  }

  onSubmit(){
    this.workpackTemplate.name = this.workpackTemplate.name.trim();
    this.workpackTemplate.shortName = this.useful.GetShortName(this.workpackTemplate.shortName);
    
    switch (this.action) {
      case 'new2schematemplate': {
        this.schemaTemplate.workpackTemplates.push(this.workpackTemplate);
        this.subscriptions.push(
          this.dataService
          .UpdateSchemaTemplate(this.schemaTemplate)
          .subscribe(
            () => {
              this.action = 'children';
              this.router.navigate(
                [
                  './schematemplate/'+ 
                  this.action + '/' + 
                  this.schemaTemplate.id
                ]);
            }
          )
        );
        break;
      }
      case 'new2workpacktemplate': {
        let parent = this.templatepath[this.templatepath.length-1];
        console.log('parent',parent);
        parent.components.push(this.workpackTemplate);
        this.subscriptions.push(
          this.dataService
          .UpdateWorkpackTemplate(parent)
          .subscribe(
            () => {
              this.action = 'children';
              this.router.navigate(
                [
                  './workpacktemplate/' + 
                  this.action + 
                  '/' + parent.id]);
            }
          )
        );
        break;
      }
      case 'edit': {
        let parentId: String;
        let parentRoute: String;

        // if my parent is a schema template...
        if (this.templatepath.length <= 1) {
          parentId = this.schemaTemplate.id;
          parentRoute = 'schematemplate';
        }
        else {
          parentId = this.templatepath[this.templatepath.length-2].id;
          parentRoute = 'workpacktemplate';
        }

        this.subscriptions.push(
          this.dataService
          .UpdateWorkpackTemplate(this.workpackTemplate)
          .subscribe(
            () => {
              this.router.navigate([
                './' + parentRoute + 
                '/children/' + parentId]);
            }
          )
        );
      }
    }
  }

  deleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete this workpack template because it contains workpack templates.")
        }
        else if(confirm("Are you sure you want to delete " + workpackTemplate2delete.name + "?")) {
          this.dataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              if (this.templatepath.length > 0) {
                this.router.navigate(['./workpacktemplate/' + this.action + '/' + this.templatepath[this.templatepath.length-1].id]);
              }
              else {
                this.router.navigate(['./schematemplate/' + this.action + '/' + this.schemaTemplate.id]);
              }
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
