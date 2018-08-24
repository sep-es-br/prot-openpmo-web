
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Office } from './Office';
import { map } from 'rxjs/operators';

@Injectable()
export class OfficeListResolver implements Resolve<Office[]> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetOffices().pipe(map<any, Office[]>(res => res));
  }
}