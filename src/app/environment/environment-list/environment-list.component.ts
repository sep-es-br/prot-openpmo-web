import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
  
})
export class EnvironmentListComponent implements OnInit {
  
  environments = [
    {
      name: "PMO-ES",
      managerName: "Victor"
    },
    {
      name: "PMO-SEGER",
      managerName: "Marília"
    },
    {
      name: "PMO-SESA",
      managerName: "Fernanda"
    },
    {
      name: "PMO-SEJUS",
      managerName: "Maria"
    },
  ];

  constructor() { }

  private items: MenuItem[];

  ngOnInit() {
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
