import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Workpack } from '../model/workpack';

@Injectable()
export class WorkpackResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  action: String;

  resolve(route: ActivatedRouteSnapshot) {
    this.id = route.paramMap.get('id');
    this.action = route.paramMap.get('action');
    if ((this.action == "edit") || (this.action == "children")) {
      this.dataService.QueryWorkpackById(this.id);
    }
  }
}
