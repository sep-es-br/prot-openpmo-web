import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schema-edit',
  templateUrl: './schema-edit.component.html',
  styleUrls: ['./schema-edit.component.css']
})
export class SchemaEditComponent implements OnInit {

  subs: Subscription[] = [];
  schemaId: Number;
  schema: any;
  private baseURL = "http://localhost:4200/api";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  private pathURL = "/schemas/";  

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.schema = this.route.snapshot.data['schema'];
  }
}
