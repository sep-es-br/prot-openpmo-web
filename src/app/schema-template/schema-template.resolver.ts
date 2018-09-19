import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Injectable()
export class SchemaTemplateResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.dataService.CleanSchemaTemplate();

    if ((this.action == "edit") || (this.action == "children")) {
      this.dataService.QuerySchemaTemplateById(this.id);
    }
  }

}
