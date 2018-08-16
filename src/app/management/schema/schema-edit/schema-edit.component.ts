import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schema-edit',
  templateUrl: './schema-edit.component.html',
  styleUrls: ['./schema-edit.component.css']
})
export class SchemaEditComponent implements OnInit {

  schema: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schema = this.route.snapshot.data['schema'];
  }
}
