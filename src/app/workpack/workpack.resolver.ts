import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Workpack } from '../model/workpack';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

@Injectable()
export class WorkpackResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  action: String;
 
    
  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.dataService.CleanWorkpack();
    if ((this.action == "edit") || (this.action == "children")) {
      this.id = route.paramMap.get('id');
      this.dataService.QueryWorkpackById(this.id);
    }
  }
}
