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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.subs.push(this.route.params.subscribe(params => {
      this.schemaId = +params['id'];
    }));
  }

  ngOnInit() {
    // setTimeout( () => {
    //   this.schema = this.dataService.schemaData;
    // },500);
    let URL = this.baseURL + this.pathURL + this.schemaId;
    console.log('URL', URL);
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.schema = data,
      err => console.log('myerror: ', err)
    );


  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
