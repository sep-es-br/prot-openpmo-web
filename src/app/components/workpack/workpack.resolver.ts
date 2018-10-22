import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { WorkpackTemplate } from '../../model/workpack-template';
import { Workpack } from '../../model/workpack';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { SchemaDataService } from '../../services/data/schema/schema-data.service';

@Injectable()
export class WorkpackResolver implements Resolve<ViewOptions> {

  constructor(private schemaDataService: SchemaDataService,
              private workpackDataService: WorkpackDataService,
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
        this.workpackDataService
          .QueryWorkpackTemplateById(this.templateId)
          .subscribe(wpt => {
            switch (this.viewOptions.action) {
              case 'new2schema': {
                this.schemaDataService.QuerySchemaById(this.id).subscribe(res => res);
                this.workpackDataService.CleanWorkpack();
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
                this.workpackDataService.CleanWorkpack();
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
                this.workpackDataService.QueryWorkpackById(this.id).subscribe(wp => {
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
