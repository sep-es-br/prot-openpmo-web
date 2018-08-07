import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';


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

  ngOnInit() {
  }

}
