import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { Plan } from '../../model/plan';
import { PlanDataService } from 'src/app/services/data/plan/plan-data.service';

@Injectable()
export class PlanResolver implements Resolve<void> {

  constructor(private PlanDataService: PlanDataService,
              private breadcrumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');

    this.PlanDataService.CleanPlan();

    let arrIds = route.paramMap.get('id').split('&');
    this.id = arrIds[0];
    if (arrIds.length > 1) {
      this.PlanDataService
      .QueryPlanStructureById(arrIds[1])
      .subscribe(ps => {
        switch (this.action) {
          case "edit": {
            this.PlanDataService.QueryPlanById(this.id)
              .subscribe(s => {
                this.breadcrumbService.SetCurrentPlan(s);
              }
            );
            break;
          }
          case "new": {
            let newPlan = new Plan();
            newPlan.id = 'new';
            newPlan.structure = ps;
            this.breadcrumbService.SetCurrentPlan(newPlan);
          }
        }
      })
    }    
  }

}
