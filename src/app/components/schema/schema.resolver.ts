import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { Schema } from '../../model/schema';
import { SchemaDataService } from 'src/app/services/data/schema/schema-data.service';

@Injectable()
export class SchemaResolver implements Resolve<void> {

  constructor(private schemaDataService: SchemaDataService,
              private breadcrumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');

    this.schemaDataService.CleanSchema();

    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];
    if (arrIds.length > 1) {
      this.schemaDataService
      .QuerySchemaTemplateById(arrIds[1])
      .subscribe(st => {
        switch (this.action) {
          case "edit": {
            this.schemaDataService.QuerySchemaById(this.id)
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
