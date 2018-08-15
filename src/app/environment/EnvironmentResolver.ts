
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { Environment } from './Environment';

@Injectable()
export class EnvironmentResolver implements Resolve<Environment> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.GetEnvironmentById(route.paramMap.get('id'));
  }
}