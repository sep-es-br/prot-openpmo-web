import { Component, OnInit } from '@angular/core';
import { WorkpackTemplateService } from '../services/workpack-template.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private wptplList: any;


  constructor(private wptplService: WorkpackTemplateService) {
    this.wptplService.workpackTemplates.subscribe(wptp => this.wptplList = wptp);
  }

  ngOnInit() {
    console.log('this.wptplList', this.wptplList);
  }

}
