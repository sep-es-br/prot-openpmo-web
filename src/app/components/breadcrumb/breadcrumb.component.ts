import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent implements OnInit {

  breadcrumbTrail: Breadcrumb[] = [];

  constructor(private breadcrumbservice: BreadcrumbService){}

  // Prepare data before loading screen
  ngOnInit() {
    this.breadcrumbservice.breadcrumbTrail.subscribe(bct => {
      this.breadcrumbTrail = bct;
    });
  }

  GoTo(index) {
    this.breadcrumbservice.GoTo(index);
  }
}
