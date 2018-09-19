import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';
import { ViewOptions } from '../model/view-options';
import { WorkpackTemplate } from '../model/workpack-template';

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

    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];

    if (arrIds.length > 1) {
      this.templateId = arrIds[1];
      this.dataService
        .QueryWorkpackTemplateById(this.templateId)
        .subscribe(wpt => wpt);
    }
        
    switch (this.viewOptions.action) {
      case 'new2schema': {
        this.dataService.QuerySchemaById(this.id);
        this.dataService.CleanWorkpack();
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        this.viewOptions.title = 'New';
        break;
      }
      case 'new2workpack': {
        this.dataService.CleanWorkpack();
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        this.viewOptions.title = 'New';
        break;
      }
      case 'children': {
        this.dataService.QueryWorkpackById(this.id).subscribe(wp => {
          this.crumbService.SetCurrentWorkpack(wp);
          this.viewOptions.title = wp.name;
        });
        this.viewOptions.showChildren = true;
        this.viewOptions.showForm = false;
        break;
      }
      case 'edit': {
        this.dataService.QueryWorkpackById(this.id).subscribe(wp => {
          this.viewOptions.title = 'Edit ' + wp.name;
        });
        this.viewOptions.showChildren = false;
        this.viewOptions.showForm = true;
        break;
      }
      case 'detail': {
        this.dataService.QueryWorkpackById(this.id).subscribe(wp => {
          this.viewOptions.title = 'Edit ' + wp.name;
        });
        this.viewOptions.showChildren = true;
        this.viewOptions.showForm = true;
        break;
      }
    }
    return this.viewOptions;
  }}
