import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Workpack } from '../model/workpack';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

@Injectable()
export class WorkpackResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  templateId: String;
  action: String;
 
    
  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.dataService.CleanWorkpack();
    this.id = route.paramMap.get('id');
    this.templateId = route.paramMap.get('tid');
    
    this.dataService.SetPanel(this.action);

    this.dataService.QueryWorkpackTemplateById(this.templateId);

    switch (this.action) {
      case 'new2schema': {
        this.dataService.QuerySchemaById(this.id);
        break;
      }
      default: {
        this.dataService.QueryWorkpackById(this.id);
        break;
      }
    }
  }
}
