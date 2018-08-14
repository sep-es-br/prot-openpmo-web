import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

/* Object type to receive the response from the http request */
export interface HttpReply { } 

@Injectable({
  providedIn: 'root'
})

export class DataService {

  environmentsData: any[] = [];
  environmentData: any;
  schemasData: any[] = [];
  schemaData: any;
  
  private baseURL = "http://localhost:4200";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  
  private basePathURL = "/api";

  constructor(private http: HttpClient) {
  }
  
  
  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request for the list of Environments
  //
  // Query all environments from database
  QueryEnvironments() {
    const pathURL = "/environments";
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => {
        this.environmentsData = data;
      },
      err => console.log('myerror: ', err)
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query an Environment by id
  //
  // 
  QueryEnvironmentById(envId: Number) {
    const pathURL = "/environments/" + envId;
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.environmentData = data,
      err => console.log('myerror: ', err)
    );
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request for the list of Schemas
  //
  // Query all schemas from database
  QuerySchemas(envId: Number) {
    const pathURL = "/schemas/" + envId;
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.schemasData = data,
      err => console.log('myerror: ', err)
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema by id
  //
  // 
  QuerySchemaById(schemaId: Number) {
    const pathURL = "/schemas/" + schemaId;
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.environmentData = data,
      err => console.log('myerror: ', err)
    );
  }



}
