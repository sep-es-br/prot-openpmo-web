import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchemaTemplate } from '../SchemaTemplate';
import { Office } from '../../../office/Office';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema-template-list',
  templateUrl: './schema-template-list.component.html',
  styleUrls: ['./schema-template-list.component.css']
})
export class SchemaTemplateListComponent implements OnInit, OnDestroy {

  schemaTemplates: SchemaTemplate[] = [];
  office: Office;

  constructor(private route: ActivatedRoute) {
    console.log('this.route', this.route);
  }

  ngOnInit() {
    this.schemaTemplates = this.route.snapshot.data['schematemplates'];
    this.office = this.route.snapshot.data['office'];
  }

  ngOnDestroy() {

  }

}
