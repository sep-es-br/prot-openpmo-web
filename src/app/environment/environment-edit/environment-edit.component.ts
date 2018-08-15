import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Environment } from '../Environment';

@Component({
  selector: 'app-environment-edit',
  templateUrl: './environment-edit.component.html',
  styleUrls: ['./environment-edit.component.css']
})


export class EnvironmentEditComponent implements OnInit {

  environment: Environment;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.environment = this.route.snapshot.data['environment'];
  }

}
