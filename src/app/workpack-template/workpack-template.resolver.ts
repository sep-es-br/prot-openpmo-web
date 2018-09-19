import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { ViewOptions } from '../model/view-options';

@Injectable()
export class WorkpackTemplateResolver implements Resolve<ViewOptions> {

  constructor(private dataService: DataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  viewOptions: ViewOptions = new ViewOptions();

  resolve(route: ActivatedRouteSnapshot) {
    this.viewOptions.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');
 
    switch (this.viewOptions.action) {
      case 'new2schematemplate': {
        this.dataService.QuerySchemaTemplateById(this.id);
        this.dataService.CleanWorkpackTemplate();
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        this.viewOptions.title = 'New Workpack Template';
        break;
      }
      case 'new2workpacktemplate': {
        this.dataService.CleanWorkpackTemplate();
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        this.viewOptions.title = 'New Workpack Template';
        break;
      }
      case 'children': {
        this.dataService.QueryWorkpackTemplateById(this.id).subscribe(wpt => {
          this.crumbService.SetCurrentWorkpackTemplate(wpt);
          this.viewOptions.title = wpt.name;
        });
        this.viewOptions.showChildren = true;
        this.viewOptions.showForm = false;
        break;
      }
      case 'edit': {
        this.dataService.QueryWorkpackTemplateById(this.id).subscribe(wpt => {
          this.viewOptions.title = 'Edit ' + wpt.name;
        });
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        break;
      }
      case 'detail': {
        this.dataService.QueryWorkpackTemplateById(this.id).subscribe(wpt => {
          this.viewOptions.title = 'Edit ' + wpt.name;
        });
        this.viewOptions.showChildren = true;
        this.viewOptions.showForm = true;
        break;
      }
    }

    return this.viewOptions;

  }
}
