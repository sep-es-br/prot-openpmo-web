import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { ViewOptions } from '../model/view-options';
import { WorkpackTemplate } from '../model/workpack-template';

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
        this.dataService.QuerySchemaTemplateById(this.id).subscribe(res => res);
        this.dataService.CleanWorkpackTemplate();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Template';
        this.viewOptions.arrIds.push(this.id);
        let newWorkpackTemplate = new WorkpackTemplate();
        newWorkpackTemplate.id = 'new';
        this.crumbService.SetCurrentWorkpackTemplate(newWorkpackTemplate);
        break;
      }
      case 'new2workpacktemplate': {
        this.dataService.CleanWorkpackTemplate();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Template';
        this.viewOptions.arrIds.push(this.id);
        let newWorkpackTemplate = new WorkpackTemplate();
        newWorkpackTemplate.id = 'new';
        this.crumbService.SetCurrentWorkpackTemplate(newWorkpackTemplate);
        break;        
      }
      case 'edit': {
        this.dataService.QueryWorkpackTemplateTree(this.id);
        this.dataService.QueryWorkpackTemplateById(this.id).subscribe(wpt => {
          this.viewOptions.title = wpt.name;
          this.crumbService.SetCurrentWorkpackTemplate(wpt);
        });
        this.viewOptions.propertiesPanelOpenState = false;
        this.viewOptions.workpacksPanelOpenState = true;
        break;
      }
    }

    return this.viewOptions;

  }
}
