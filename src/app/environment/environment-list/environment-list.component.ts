import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
  
})
export class EnvironmentListComponent implements OnInit {
  
  environments = [];

  constructor(private dataService: DataService) {
    dataService.QueryEnvironments();
  }

  private items: MenuItem[];

  ngOnInit() {
    setTimeout( () => {
      this.environments = this.dataService.environmentsData;
    },100);

    this.items = [
      {label:'Categories'},
      {label:'Sports'},
      {label:'Football'},
      {label:'Countries'},
      {label:'Spain'},
      {label:'F.C. Barcelona'},
      {label:'Squad'},
      {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
    ];

  }

}
