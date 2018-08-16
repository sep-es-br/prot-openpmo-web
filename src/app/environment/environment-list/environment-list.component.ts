import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
})

export class EnvironmentListComponent implements OnInit {

  environments: any;

  constructor(private route: ActivatedRoute) {
  }

  private items = [];

  ngOnInit() {
    this.environments = this.route.snapshot.data['environments'];
  }

}
