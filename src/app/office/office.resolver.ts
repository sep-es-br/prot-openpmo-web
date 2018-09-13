import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Injectable()
export class OfficeResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String = '';
  action: String = '';

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.dataService.CleanOffice();
    this.id = route.paramMap.get('id');    
    if ((this.action == "edit") || (this.action == "children")) {
      this.dataService.QueryOfficeById(this.id);
    }
  }
}
