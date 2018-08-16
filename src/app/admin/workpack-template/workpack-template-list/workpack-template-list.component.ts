import { Component, OnInit } from '@angular/core';
import { SchemaTemplate } from '../../schema-template/SchemaTemplate';
import { WorkpackTemplate } from '../WorkpackTemplate';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-workpack-template-list',
  templateUrl: './workpack-template-list.component.html',
  styleUrls: ['./workpack-template-list.component.css']
})
export class WorkpackTemplateListComponent implements OnInit {

  parentName: String = "";
  schemaTemplate: SchemaTemplate;
  parentWorkpackTemplate: WorkpackTemplate;
  workpackTemplates: WorkpackTemplate[] = [];
  navigationSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.InitializeWorkpackTemplates();
      }
    });
  }

  ngOnInit() {
  }

  InitializeWorkpackTemplates() {
    this.workpackTemplates = this.route.snapshot.data['workpacktemplates'];
    this.schemaTemplate = this.route.snapshot.data['schematemplate'];
    this.parentWorkpackTemplate = this.route.snapshot.data['workpacktemplate'];
    if (this.schemaTemplate !== undefined) {
      this.parentName = this.schemaTemplate.name;
    }
    else if (this.parentWorkpackTemplate !== undefined){
      this.parentName = this.parentWorkpackTemplate.profile;
    }
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

}
