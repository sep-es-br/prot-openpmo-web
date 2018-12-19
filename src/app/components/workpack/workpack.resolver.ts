import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { WorkpackModel } from '../../model/workpack-model';
import { Workpack } from '../../model/workpack';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { PlanDataService } from '../../services/data/plan/plan-data.service';

@Injectable()
export class WorkpackResolver implements Resolve<ViewOptions> {

  constructor(private PlanDataService: PlanDataService,
              private workpackDataService: WorkpackDataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  modelId: String;
  viewOptions: ViewOptions = new ViewOptions();
  workpackModel: WorkpackModel;
    
  resolve(route: ActivatedRouteSnapshot) {
    this.viewOptions.action = route.paramMap.get('action');
    this.viewOptions.arrIds = route.paramMap.get('id').split('&');
    this.id = this.viewOptions.arrIds[0];

    if (this.viewOptions.arrIds.length > 1) {
      this.modelId = this.viewOptions.arrIds[1];
        this.workpackDataService
          .QueryWorkpackModelById(this.modelId)
          .subscribe(wpm => {
            switch (this.viewOptions.action) {
              case 'new2Plan': {
                this.PlanDataService.QueryPlanById(this.id).subscribe(res => res);
                this.workpackDataService.CleanWorkpack();
                this.viewOptions.propertiesPanelOpenState = true;
                this.viewOptions.workpacksPanelOpenState = false;
                this.viewOptions.stakeholdersPanelOpenState = false;
                this.viewOptions.title = 'New ' + wpm.name;
                let newWorkpack = new Workpack();
                newWorkpack.id = 'new';
                newWorkpack.model = wpm;
                newWorkpack.name = '';
                wpm.propertyProfiles.forEach(pProfile => {
                  newWorkpack.properties.push({
                    id: '',
                    name: pProfile.name,
                    value: pProfile.value,
                    profile: pProfile
                  });
                });
                this.workpackDataService.SetWorkpack(newWorkpack);

                this.crumbService.SetCurrentWorkpack(newWorkpack);
                break;
              }
              case 'new2workpack': {
                this.workpackDataService.CleanWorkpack();
                this.viewOptions.title = 'New ' + wpm.name;
                this.viewOptions.propertiesPanelOpenState = true;
                this.viewOptions.workpacksPanelOpenState = false;
                this.viewOptions.stakeholdersPanelOpenState = false;
                let newWorkpack = new Workpack();
                newWorkpack.id = 'new';
                newWorkpack.model = wpm;
                newWorkpack.name = '';
                wpm.propertyProfiles.forEach(pProfile => {
                  newWorkpack.properties.push({
                    id: '',
                    name: pProfile.name,
                    value: pProfile.value,
                    profile: pProfile
                  });
                });
                this.workpackDataService.SetWorkpack(newWorkpack);
               
                this.crumbService.SetCurrentWorkpack(newWorkpack);
                break;
              }
              case 'edit': {
                this.workpackDataService.QueryWorkpackById(this.id).subscribe(wp => {
                  this.crumbService.SetCurrentWorkpack(wp);
                  this.viewOptions.title = wp.name;
                });
                this.viewOptions.propertiesPanelOpenState = true;
                this.viewOptions.workpacksPanelOpenState = false;
                this.viewOptions.stakeholdersPanelOpenState = false;
                break;
              }
            }
          });
    }
    
    return this.viewOptions;
  }}
