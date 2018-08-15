import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Schema } from './Schema';

@Injectable()
export class SchemaListResolver implements Resolve<Schema[]> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetSchemas(route.paramMap.get('containerid'));
  }
}