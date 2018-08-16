import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../data.service';
import { WorkpackTemplate } from './WorkpackTemplate';


@Injectable()
export class WorkpackTemplateListResolver implements Resolve<WorkpackTemplate[]> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetWorkpackTemplates(route.paramMap.get('id'));
  }
}