import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';

@Injectable()
export class SchemaTemplateResolver implements Resolve<void> {

  constructor(private dataService: DataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.dataService.CleanSchemaTemplate();

    if (this.action == "edit") {
      this.dataService.QuerySchemaTemplateById(this.id).subscribe(st => {
        this.crumbService.SetCurrentSchemaTemplate(st);
      });
    }
  }

}
