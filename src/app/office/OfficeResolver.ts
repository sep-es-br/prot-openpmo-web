
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Office } from './Office';

@Injectable()
export class OfficeResolver implements Resolve<Office> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let ret = this.dataService.GetOfficeById(route.paramMap.get('id'));
    return ret;
  }
}