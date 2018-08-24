import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../../data.service';
import { Workpack } from './Workpack';

@Injectable()
export class WorkpackResolver implements Resolve<Workpack> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('resolving wp...');
    let ret = this.dataService.GetWorkpackById(route.paramMap.get('id'));
    console.log('ret', ret);
    return ret;
  }
}
