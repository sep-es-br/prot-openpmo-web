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
    
    this.dataService.SetPanel(this.action);
    
    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];
    if (arrIds.length > 1) {
      this.dataService.QueryWorkpackTemplateById(arrIds[1]);
    }

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
