import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Workpack } from '../model/workpack';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

@Injectable()
export class WorkpackResolver implements Resolve<void> {

  constructor(private dataService: DataService, 
              private crumbService: BreadcrumbService) {}
  id: String;
  action: String;
  breadcrumbTrail: Breadcrumb[];
    
  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    if ((this.action == "edit") || (this.action == "children")) {
      this.id = route.paramMap.get('id');
    }
    this.crumbService.breadcrumbTrail.subscribe(bct => {
      this.breadcrumbTrail = bct;
    });
    this.dataService.QueryWorkpackById(this.id);
    this.dataService.workpack.subscribe(wp => {
      this.UpdateBreadcrumb(wp);
    });
  }

  UpdateBreadcrumb(workpack) {
    if ((workpack !== undefined) && (workpack.id !== '')) {
      let index = this.breadcrumbTrail.findIndex(crumb => crumb.id == workpack.id);
      if (index == -1) {
        this.crumbService.Add({
          action: this.action,
          active: false,
          id: workpack.id,
          label: workpack.name,
          route: 'workpack'
        });
      }
      else {
        this.crumbService.GoTo(index);
      }
    }
  }



}
