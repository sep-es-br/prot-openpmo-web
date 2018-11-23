import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { WorkpackModel } from '../../model/workpack-model';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { PlanDataService } from 'src/app/services/data/plan/plan-data.service';

@Injectable()
export class WorkpackModelResolver implements Resolve<ViewOptions> {

  constructor(private PlanDataService: PlanDataService,
              private workpackDataService: WorkpackDataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  viewOptions: ViewOptions = new ViewOptions();

  resolve(route: ActivatedRouteSnapshot) {
    this.viewOptions.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.workpackDataService.QueryPropertyTypes().subscribe(res => res);
 
    switch (this.viewOptions.action) {
      case 'new2planstructure': {
        this.PlanDataService.QueryPlanStructureById(this.id).subscribe(res => res);
        this.workpackDataService.CleanWorkpackModel();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Model';
        this.viewOptions.arrIds.push(this.id);
        let newWorkpackModel = new WorkpackModel();
        this.workpackDataService.QueryDefaultWorkpackModel().subscribe(newWPT => {
          newWPT.id = 'new';
          this.crumbService.SetCurrentWorkpackModel(newWPT);
        });
        break;
      }
      case 'new2workpackmodel': {
        this.workpackDataService.CleanWorkpackModel();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Model';
        this.viewOptions.arrIds = [];
        this.viewOptions.arrIds.push(this.id);

        this.workpackDataService.QueryDefaultWorkpackModel().subscribe(newWPT => {
          newWPT.id = 'new';
          this.crumbService.SetCurrentWorkpackModel(newWPT);
        });
        break;        
      }
      case 'edit': {
        this.workpackDataService.QueryWorkpackModelTree(this.id);
        this.workpackDataService.QueryWorkpackModelById(this.id).subscribe(wpm => {
          this.viewOptions.title = wpm.name;
          this.crumbService.SetCurrentWorkpackModel(wpm);
        });
        this.viewOptions.propertiesPanelOpenState = false;
        this.viewOptions.workpacksPanelOpenState = true;
        break;
      }
    }

    return this.viewOptions;

  }
}
