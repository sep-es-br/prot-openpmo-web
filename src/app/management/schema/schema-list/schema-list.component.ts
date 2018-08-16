import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../Schema';
import { Environment } from '../../../environment/Environment';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.css']
})
export class SchemaListComponent implements OnInit {

  schemas: Schema[] = [];
  environment: Environment;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schemas = this.route.snapshot.data['schemas'];
    this.environment = this.route.snapshot.data['environment'];
  }

}
