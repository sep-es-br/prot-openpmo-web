import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';
import { ViewOptions } from '../model/view-options';
import { WorkpackTemplate } from '../model/workpack-template';
import { Workpack } from '../model/workpack';
import { Schema } from '../model/schema';
import { Subscription } from 'rxjs';

@Injectable()
export class WorkpackResolver implements Resolve<ViewOptions> {

  constructor(private dataService: DataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  templateId: String;
  viewOptions: ViewOptions = new ViewOptions();
  workpackTemplate: WorkpackTemplate;
    
  resolve(route: ActivatedRouteSnapshot) {
    this.viewOptions.action = route.paramMap.get('action');
    this.viewOptions.arrIds = route.paramMap.get('id').split('&');
    this.id = this.viewOptions.arrIds[0];

    if (this.viewOptions.arrIds.length > 1) {
      this.templateId = this.viewOptions.arrIds[1];
        this.dataService
          .QueryWorkpackTemplateById(this.templateId)
          .subscribe(wpt => {
            switch (this.viewOptions.action) {
              case 'new2schema': {
                this.dataService.QuerySchemaById(this.id).subscribe(res => res);
                this.dataService.CleanWorkpack();
                this.viewOptions.propertiesPanelOpenState = true;
                this.viewOptions.workpacksPanelOpenState = false;
                this.viewOptions.title = 'New ' + wpt.name;
                let newWorkpack = new Workpack();
                newWorkpack.id = 'new';
                newWorkpack.template = wpt;
                this.crumbService.SetCurrentWorkpack(newWorkpack);
                break;
              }
              case 'new2workpack': {
                this.dataService.CleanWorkpack();
                this.viewOptions.title = 'New ' + wpt.name;
                this.viewOptions.propertiesPanelOpenState = true;
                this.viewOptions.workpacksPanelOpenState = false;
                let newWorkpack = new Workpack();
                newWorkpack.id = 'new';
                newWorkpack.template = wpt;
                this.crumbService.SetCurrentWorkpack(newWorkpack);
                break;
              }
              case 'edit': {
                this.dataService.QueryWorkpackById(this.id).subscribe(wp => {
                  this.crumbService.SetCurrentWorkpack(wp);
                  this.viewOptions.title = wp.name;
                });
                this.viewOptions.propertiesPanelOpenState = false;
                this.viewOptions.workpacksPanelOpenState = true;

                break;
              }
            }
          });
    }
    
    return this.viewOptions;
  }}
