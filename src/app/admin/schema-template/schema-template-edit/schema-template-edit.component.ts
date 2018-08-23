import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemaTemplate } from '../SchemaTemplate';

@Component({
  selector: 'app-schema-template-edit',
  templateUrl: './schema-template-edit.component.html',
  styleUrls: ['./schema-template-edit.component.css']
})
export class SchemaTemplateEditComponent implements OnInit {

  schemaTemplate: SchemaTemplate;
  action: String;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schemaTemplate = this.route.snapshot.data['schematemplate'];
    this.action = this.route.snapshot.params['action'];
  }
  
}
