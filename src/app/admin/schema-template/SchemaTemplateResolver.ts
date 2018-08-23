import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../data.service';
import { SchemaTemplate } from './SchemaTemplate';
import { Observable } from 'rxjs';


@Injectable()
export class SchemaTemplateResolver implements Resolve<SchemaTemplate> {

  private action: String;
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {

    this.action = route.paramMap.get('action');
    if (this.action == 'edit'){
      return this.dataService.GetSchemaTemplateById(route.paramMap.get('id'));
    }
    else if (this.action == 'new'){
      return new SchemaTemplate();
    }
  }
}