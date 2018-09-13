import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Injectable()
export class SchemaResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');

    this.dataService.CleanSchema();

    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];
    if (arrIds.length > 1) {
      this.dataService.QuerySchemaTemplateById(arrIds[1]);
    }    

    if ((this.action == "edit") || (this.action == "children")) {
      this.dataService.QuerySchemaById(this.id);
    }


  }

}
