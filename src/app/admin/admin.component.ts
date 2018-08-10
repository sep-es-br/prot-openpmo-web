import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private wptplList: any;


  constructor(private dataService: DataService) {
//    this.dataService.GetAllWorkpackTemplates();
//    this.dataService.workpackTemplates.subscribe(wptp => this.wptplList = wptp);
  }

  ngOnInit() {
    console.log('this.wptplList', this.wptplList);
  }

}
