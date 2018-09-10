import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Injectable()
export class SchemaResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;
  action: String;

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.dataService.CleanSchema();
    if ((this.action == "edit") || (this.action == "children")) {
      this.id = route.paramMap.get('id');
      this.dataService.QuerySchemaById(this.id);
    }
  }

}
