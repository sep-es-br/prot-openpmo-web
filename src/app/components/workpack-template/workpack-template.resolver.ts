import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ViewOptions } from '../../model/view-options';
import { WorkpackTemplate } from '../../model/workpack-template';
import { WorkpackDataService } from '../../services/data/workpack/workpack-data.service';
import { SchemaDataService } from 'src/app/services/data/schema/schema-data.service';
import { translation,translation2 } from '../../pipes/translation'

@Injectable()
export class WorkpackTemplateResolver implements Resolve<ViewOptions> {

  constructor(private schemaDataService: SchemaDataService,
              private workpackDataService: WorkpackDataService,
              private crumbService: BreadcrumbService) {}
  id: String;
  viewOptions: ViewOptions = new ViewOptions();

  resolve(route: ActivatedRouteSnapshot) {
    this.viewOptions.action = route.paramMap.get('action');
    this.id = route.paramMap.get('id');

    this.workpackDataService.QueryPropertyTypes().subscribe(res => res);
 
    switch (this.viewOptions.action) {
      case 'new2schematemplate': {
        this.schemaDataService.QuerySchemaTemplateById(this.id).subscribe(res => res);
        this.workpackDataService.CleanWorkpackTemplate();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Template';
        this.viewOptions.arrIds.push(this.id);
        let newWorkpackTemplate = new WorkpackTemplate();
        newWorkpackTemplate.id = 'new';
        this.crumbService.SetCurrentWorkpackTemplate(newWorkpackTemplate);
        break;
      }
      case 'new2workpacktemplate': {
        this.workpackDataService.CleanWorkpackTemplate();
        this.viewOptions.propertiesPanelOpenState = true;
        this.viewOptions.workpacksPanelOpenState = false;
        this.viewOptions.title = 'New Workpack Template';
        this.viewOptions.arrIds.push(this.id);
        let newWorkpackTemplate = new WorkpackTemplate();
        newWorkpackTemplate.id = 'new';
        this.crumbService.SetCurrentWorkpackTemplate(newWorkpackTemplate);
        break;        
      }
      case 'edit': {
        this.workpackDataService.QueryWorkpackTemplateTree(this.id);
        this.workpackDataService.QueryWorkpackTemplateById(this.id).subscribe(wpt => {
          this.viewOptions.title = wpt.name;
          this.crumbService.SetCurrentWorkpackTemplate(wpt);
        });
        this.viewOptions.propertiesPanelOpenState = false;
        this.viewOptions.workpacksPanelOpenState = true;
        break;
      }
    }

    return this.viewOptions;

  }
}
