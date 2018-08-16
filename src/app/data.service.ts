import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from './environment/Environment';
import { Schema } from './management/schema/Schema';
import { Workpack } from './management/workpack/Workpack';
import { SchemaTemplate } from './admin/schema-template/SchemaTemplate';
import { WorkpackTemplate } from './admin/workpack-template/WorkpackTemplate';



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
  // Return: Observable array of Environments
  // 
  GetEnvironments() {
    const pathURL = '/environments';
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Environment[]>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get an Environment by its id
  //
  // Parameters: 
  //    id: The id of the Environment to retrieve
  //
  // Return: An Observable Environment
  //
  GetEnvironmentById(id: String) {
    const pathURL = '/environments/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    let ret = this.http.get(URL).pipe(map<any, Environment>(res => res));
    return ret;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Schemas adopted by an Environment
  //
  // Parameters: 
  //    id: The id of the Environment that adopted the Schemas
  //
  // Return: An Observable array of Schemas adopted by the Environment
  //
  GetSchemas(id: String) {
    const pathURL = '/schemas/listschemas/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Schema[]>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: The Observable Schema retrieved
  //
  GetSchemaById(id: String) {
    const pathURL = '/schemas/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Schema>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Workpacks root of a Schema
  //
  // Parameters: 
  //    id: The id of the parent Schema or Workpack 
  //
  // Return: An Observable array of Workpacks chiltren of the parent Schema or Workpack
  //
  GetWorkpacks(id: String) {
    const pathURL = '/workpacks/listworkpacks/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Workpack[]>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack by id
  //
  // Parameters: 
  //    id: The id of the Workpack to retrieve
  //
  // Return: The Observable Workpack retrieved
  //
   GetWorkpackById(id: String) {
    const pathURL = '/workpacks/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Workpack>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Schemas Templates adopted by an Environment
  //
  // Parameters: 
  //    id: The id of the Environment that adopted the Schema Templates
  //
  // Return: An Observable array of Schema Templates adopted by the Environment
  //
  GetSchemaTemplates(id: String) {
    console.log('getting...');
    const pathURL = '/schematemplates/listschematemplates/' + id;

    const URL = this.baseURL + this.basePathURL + pathURL;
    console.log(URL);
    return this.http.get(URL).pipe(map<any, SchemaTemplate[]>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema Template by id
  //
  // Parameters: 
  //    id: The id of the Schema Template to retrieve
  //
  // Return: The Observable Schema Template retrieved
  //
  GetSchemaTemplateById(id: String) {
    const pathURL = '/schematemplates/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, SchemaTemplate>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Workpack Templates children of 
  //    a parent Schema Template or Workpack Template
  //
  // Parameters: 
  //    id: The id of the parent Schema Template or Workpack Template
  //
  // Return: An Observable array of children Workpack Templates
  //
  GetWorkpackTemplates(id: String) {
    const pathURL = '/workpacktemplates/listworkpacktemplates/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, WorkpackTemplate[]>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack Template by id
  //
  // Parameters: 
  //    id: The id of the Workpack Template to be retrieved
  //
  // Return: An Observable Workpack Template retrieved
  //
  GetWorkpackTemplateById(id: String) {
    const pathURL = '/workpacktemplates/' + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, WorkpackTemplate>(res => res));
  }




}
