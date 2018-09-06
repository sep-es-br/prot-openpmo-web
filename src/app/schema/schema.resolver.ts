import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Schema } from '../model/schema';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

@Injectable()
export class SchemaResolver implements Resolve<void> {

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

    this.dataService.QuerySchemaById(this.id);
    this.dataService.schema.subscribe(s => {
      this.UpdateBreadcrumb(s);
    });
  }

  UpdateBreadcrumb(schema) {
    if ((schema !== undefined) && (schema.id !== '')){
      let index = this.breadcrumbTrail.findIndex(crumb => crumb.id == schema.id);
      if (index == -1) {
        this.crumbService.Add({
          action: this.action,
          active: false,
          id: schema.id,
          label: schema.name,
          route: 'schema'
        })
      }
      else {
        this.crumbService.GoTo(index);
      }
    }
  }

}
