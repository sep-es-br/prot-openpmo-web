import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { Office } from '../model/office';

@Injectable()
export class OfficeResolver implements Resolve<void> {

  constructor(private dataService: DataService,
              private breadcrumbService: BreadcrumbService) {}
  id: String = '';
  action: String = '';

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.dataService.CleanOffice();
    this.id = route.paramMap.get('id');    
    if (this.action == "edit") {
      this.dataService.QueryOfficeById(this.id).subscribe(o => {
        this.breadcrumbService.SetCurrentOffice(o);
      });
    }
    else if (this.action == "new") {
      let office = new Office;
      office.id = 'new';
      this.breadcrumbService.UpdateBreadcrumb(office, 'office');
    }
  }
}
