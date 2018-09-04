import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Panel } from './model/panel';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';


@Injectable()
export class PanelResolver implements Resolve<void> {

  constructor(private dataService: DataService) {}
  id: String;

  resolve(route: ActivatedRouteSnapshot) {
    let panel = new Panel();
    panel.action = route.paramMap.get('action');
    panel.showForm = (panel.action != 'children');
    panel.showChildren = ((panel.action == 'children') || (panel.action == 'detail'));
    this.dataService.SetPanel(panel);
  }
}
