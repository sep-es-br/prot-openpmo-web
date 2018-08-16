import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchemaTemplate } from '../SchemaTemplate';
import { Environment } from '../../../environment/Environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema-template-list',
  templateUrl: './schema-template-list.component.html',
  styleUrls: ['./schema-template-list.component.css']
})
export class SchemaTemplateListComponent implements OnInit, OnDestroy {

  schemaTemplates: SchemaTemplate[] = [];
  environment: Environment;

  constructor(private route: ActivatedRoute) {
    console.log('this.route', this.route);
  }

  ngOnInit() {
    this.schemaTemplates = this.route.snapshot.data['schematemplates'];
    this.environment = this.route.snapshot.data['environment'];
  }

  ngOnDestroy() {

  }

}
