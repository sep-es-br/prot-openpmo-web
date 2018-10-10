import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { Schema } from '../model/schema';

@Injectable()
export class SchemaResolver implements Resolve<void> {

  constructor(private dataService: DataService,
              private breadcrumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');

    this.dataService.CleanSchema();

    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];
    if (arrIds.length > 1) {
      this.dataService
      .QuerySchemaTemplateById(arrIds[1])
      .subscribe(st => {
        switch (this.action) {
          case "edit": {
            this.dataService.QuerySchemaById(this.id)
              .subscribe(s => {
                this.breadcrumbService.SetCurrentSchema(s);
              }
            );
            break;
          }
          case "new": {
            let newSchema = new Schema();
            newSchema.id = 'new';
            newSchema.template = st;
            this.breadcrumbService.SetCurrentSchema(newSchema);
          }
        }
      })
    }    
  }

}
