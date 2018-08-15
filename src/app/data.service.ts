import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from './environment/Environment';
import { Schema } from './schema/Schema';
import { Workpack } from './workpack/Workpack';


/* Object type to receive the response from the http request */

@Injectable({
  providedIn: 'root'
})

export class DataService {

  environmentsData: any[] = [];
  environmentData: any;
  schemasData: any[] = [];
  schemaData: any;

  private baseURL = 'http://localhost:4200';
  // private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";

  private basePathURL = '/api';

  constructor(private http: HttpClient) {
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Environments
  //
  // Query all environments from database
  GetEnvironments() {
    const pathURL = '/environments';
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Environment[]>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get an Environments by its id
  //
  //
  GetEnvironmentById(envId: String) {
    const pathURL = '/environments/' + envId;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Environment>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Schemas adopted by an Environment
  //
  GetSchemas(envId: String) {
    const pathURL = '/schemas/listschemas/' + envId;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Schema[]>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema by id
  //
  //
  GetSchemaById(schemaId: String) {
    const pathURL = '/schemas/' + schemaId;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Schema>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Workpacks root of a Schema
  //
  GetWorkpacks(parentId: String) {
    const pathURL = '/workpacks/listworkpacks/' + parentId;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Workpack[]>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack by id
  //
  //
  GetWorkpackById(workpackId: String) {
    const pathURL = '/workpacks/' + workpackId;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Workpack>(res => res));
  }



}
