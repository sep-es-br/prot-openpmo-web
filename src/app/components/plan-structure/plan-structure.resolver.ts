import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { PlanDataService } from 'src/app/services/data/plan/plan-data.service';

@Injectable()
export class PlanStructureResolver implements Resolve<void> {

  constructor(private PlanDataService: PlanDataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  action: String;
  subscriptions: Subscription[] = [];

  resolve(route: ActivatedRouteSnapshot) {
    this.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.PlanDataService.CleanPlanStructure();

    if (this.action == "edit") {
      this.PlanDataService.QueryPlanStructureById(this.id).subscribe(ps => {
        this.crumbService.SetCurrentPlanStructure(ps);
      });
    }
  }

}
