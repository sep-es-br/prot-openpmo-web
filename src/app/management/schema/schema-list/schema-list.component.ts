import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../Schema';
import { Office } from '../../../office/Office';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.css']
})
export class SchemaListComponent implements OnInit {

  schemas: Schema[] = [];
  office: Office;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schemas = this.route.snapshot.data['schemas'];
    this.office = this.route.snapshot.data['office'];
  }

}
