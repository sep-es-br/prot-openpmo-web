import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { SchemaDataService } from 'src/app/services/data/schema/schema-data.service';

@Injectable()
export class SchemaTemplateResolver implements Resolve<void> {

  constructor(private schemaDataService: SchemaDataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.schemaDataService.CleanSchemaTemplate();

    if (this.action == "edit") {
      this.schemaDataService.QuerySchemaTemplateById(this.id).subscribe(st => {
        this.crumbService.SetCurrentSchemaTemplate(st);
      });
    }
  }

}
