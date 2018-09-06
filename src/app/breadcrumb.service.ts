import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class Breadcrumb {
  label: String;
  route: String;
  id: String;
  action: String;
  active: Boolean; 
}
export class BreadcrumbService {

  // Observable array of breadcrumb to represent the trail
  private $breadcrumbTrail = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbTrail = this.$breadcrumbTrail.asObservable();

  constructor() { }

  public Add(breadcrumb: Breadcrumb){
    let newTrail: Breadcrumb[] = [];
    this.$breadcrumbTrail.getValue().forEach((crumb, i) => {
      crumb.active = true;
      newTrail.push(crumb);
    });
    newTrail.push(breadcrumb);
    this.$breadcrumbTrail.next(newTrail);
  }

  public GoTo(index){
    let newTrail: Breadcrumb[] = [];
    this.$breadcrumbTrail.getValue().forEach((crumb, i) => {
      if (i <= index) {
        crumb.active = (i < index);
        newTrail.push(crumb);
      }
    });
    this.$breadcrumbTrail.next(newTrail);
  }

  

}
