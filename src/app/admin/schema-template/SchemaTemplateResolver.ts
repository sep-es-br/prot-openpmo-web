import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../data.service';
import { SchemaTemplate } from './SchemaTemplate';


@Injectable()
export class SchemaTemplateResolver implements Resolve<SchemaTemplate> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetSchemaTemplateById(route.paramMap.get('id'));
  }
}