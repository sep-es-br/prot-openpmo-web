import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../Schema';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.css']
})
export class SchemaListComponent implements OnInit {

  schemas: Schema[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schemas = this.route.snapshot.data['schemas'];
  }

}
