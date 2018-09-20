import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Panel } from '../data.service';
import { Subscription } from 'rxjs';
import { Office } from '../model/office';
import { SchemaTemplate } from '../model/schema-template';
import { WorkpackTemplate } from '../model/workpack-template';
import { Useful } from '../useful';
import { BreadcrumbService } from '../breadcrumb.service';
import { ViewOptions } from '../model/view-options';
import { MatDialog } from '@angular/material/dialog';
import { ReuseTreeviewDialogComponent } from './reuse-treeview-dialog/reuse-treeview-dialog.component';

@Component({
  selector: 'app-workpack-template',
  templateUrl: './workpack-template.component.html',
  styleUrls: ['./workpack-template.component.css']
})

@NgModule({
  entryComponents:[ ReuseTreeviewDialogComponent ]
})

export class WorkpackTemplateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService,
    private dialog: MatDialog) {
    }

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schemaTemplate: SchemaTemplate = new SchemaTemplate();
  workpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  parentWorkpackTemplate: WorkpackTemplate = new WorkpackTemplate();
  viewOptions: ViewOptions = new ViewOptions();

  ngOnInit() {

    this.viewOptions = this.route.snapshot.data.workpacktemplate;

    this.subscriptions.push(
      this.dataService.workpackTemplate.subscribe(wpt =>{
            this.workpackTemplate = wpt;
      })
    );

    this.subscriptions.push(
      this.dataService.schemaTemplate.subscribe(st => {
        this.schemaTemplate = st;
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

  OpenReuseModal() {
    let animal: string;
    let name: string;
    let dialogRef = this.dialog.open(ReuseTreeviewDialogComponent, {
      width: '250px',
      data: {
        rootNode: this.workpackTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      animal = result;
    });
  }

  onSubmit(){
    this.workpackTemplate.name = this.workpackTemplate.name.trim();
    this.workpackTemplate.shortName = this.useful.GetShortName(this.workpackTemplate.shortName);
    
    switch (this.viewOptions.action) {
      case 'new2schematemplate': {
        this.schemaTemplate.workpackTemplates.push(this.workpackTemplate);
        this.subscriptions.push(
          this.dataService
          .UpdateSchemaTemplate(this.schemaTemplate)
          .subscribe(
            () => {
              this.viewOptions.action = 'children';
              this.router.navigate([
                './schematemplate/' + this.viewOptions.action + 
                '/' + this.schemaTemplate.id]);
            }
          )
        );
        break;
      }
      case 'new2workpacktemplate': {
        this.subscriptions.push(
          this.dataService.GetWorkpackTemplateById(this.crumbService.GetLast().id)
          .subscribe(parentWPT => {
            parentWPT.components.push(this.workpackTemplate);
            this.subscriptions.push(
              this.dataService
              .UpdateWorkpackTemplate(parentWPT)
              .subscribe(
                () => {
                  this.viewOptions.action = 'children';
                  this.router.navigate([
                    './workpacktemplate/'+ this.viewOptions.action + 
                    '/' + parentWPT.id]);
                }
              )
            );
          })
        );
        break;
      }
      case 'edit': {
        this.subscriptions.push(
          this.dataService
          .UpdateWorkpackTemplate(this.workpackTemplate)
          .subscribe(
            () => {
              let lastCrumb = this.crumbService.GetLast();
              this.router.navigate([
                './' + lastCrumb.route +
                '/' + lastCrumb.action +
                '/' + lastCrumb.id]);
            }
          )
        );
      }
    }
  }

  DeleteWorkpackTemplate(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackTemplateById(id)
      .subscribe(workpackTemplate2delete => {
        if (workpackTemplate2delete.components.length > 0) {
          alert("Sorry, you can not delete " + 
                workpackTemplate2delete.name + 
                " because it contains workpacks.")
        }
        else if(confirm("Are you sure you want to delete " + workpackTemplate2delete.name + "?")) {
          this.dataService.DeleteWorkpackTemplate(id).subscribe(
            () => {
              this.subscriptions
              .push(this.dataService.QueryWorkpackTemplateById(this.workpackTemplate.id)
                .subscribe(wpt => wpt));
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
