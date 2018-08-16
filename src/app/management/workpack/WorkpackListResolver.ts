import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../data.service';
import { Workpack } from './Workpack';

@Injectable()
export class WorkpackListResolver implements Resolve<Workpack[]> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetWorkpacks(route.paramMap.get('id'));
  }
}
