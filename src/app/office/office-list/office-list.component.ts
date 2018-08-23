import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})

export class OfficeListComponent implements OnInit {

  offices: any;

  constructor(private route: ActivatedRoute) {
  }

  private items = [];

  ngOnInit() {
    this.offices = this.route.snapshot.data['offices'];
  }

}
