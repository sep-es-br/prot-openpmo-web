import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Office } from '../model/office';
import { Observable } from 'rxjs';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

@Injectable()
export class OfficeResolver implements Resolve<void> {

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

    this.dataService.QueryOfficeById(this.id);
    this.dataService.office.subscribe(o => {
      this.UpdateBreadcrumb(o);
    });
  }

  UpdateBreadcrumb(office) {
    if ((office !== undefined) && (office.id !== '')){
      let index = this.breadcrumbTrail.findIndex(crumb => crumb.id == office.id);
      if (index == -1) {
        this.crumbService.Add({
          action: this.action,
          active: false,
          id: office.id,
          label: office.name,
          route: 'office'
        })
      }
      else {
        this.crumbService.GoTo(index);
      }
    }
  }
}
