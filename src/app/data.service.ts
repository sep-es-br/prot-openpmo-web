import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Office } from './office/Office';
import { Schema } from './management/schema/Schema';
import { Workpack } from './management/workpack/Workpack';
import { SchemaTemplate } from './admin/schema-template/SchemaTemplate';
import { WorkpackTemplate } from './admin/workpack-template/WorkpackTemplate';
import { environment } from 'src/environments/environment';



/* Object type to receive the response from the http request */

@Injectable({
  providedIn: 'root'
})

export class DataService {

 
  // Observable property for the array of offices
  private $offices = new BehaviorSubject<Office[]>([]);
  offices = this.$offices.asObservable();

  // Observable property for the array of schemas
  private $schemas = new BehaviorSubject<Schema[]>([]);
  schemas = this.$schemas.asObservable();

  // Observable property for the array of workpacks
  private $workpacks = new BehaviorSubject<Workpack[]>([]);
  workpacks = this.$workpacks.asObservable();


  private baseURL = environment.databaseHost;
  // private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";

  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient) {
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Offices
  // 
  // Return: Observable array of Offices
  // 
  GetOffices(): Observable<Office[]> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, any>(res => {
       this.$offices.next(res as Office[]);
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get an Office by its id
  //
  // Parameters: 
  //    id: The id of the Office to retrieve
  //
  // Return: An Observable Office
  //
  GetOfficeById(id: String) {
    const pathURL = environment.officeAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Office>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save an Office
  //
  // Parameters: 
  //    office: The Office object to save
  //
  // Return: error if something went wrong
  //
  SaveOffice(office: Office): Observable<Office> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.post(
      URL, 
      JSON.stringify(office), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Office>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete an Office
  //
  // Parameters: 
  //    id: The id of the Office to delete
  //
  // Return: error if something went wrong
  //
  DeleteOffice(id: String): Observable<any> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    return this.http.delete(URL).pipe(map<any, any>(res => res));
  }

  

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Schemas adopted by an Office
  //
  // Parameters: 
  //    id: The id of the Office that adopted the Schemas
  //
  // Return: An Observable array of Schemas adopted by the Office
  //
  GetSchemas(id: String) {
    const pathURL = environment.schemaAPI + environment.listSchemasFunction + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, any>(res => {
      this.$schemas.next(res as Schema[]);
    }));
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
    const pathURL = environment.schemaAPI + id;
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
    const pathURL =  environment.workpackAPI + environment.listWorkpacksFunction + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    //return this.http.get(URL).pipe(map<any, Workpack[]>(res => res));

    return this.http.get(URL).pipe(map<any, any>(res => {
      this.$workpacks.next(res as Workpack[]);
    }));


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
    const pathURL = environment.workpackAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, Workpack>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for a list of Schemas Templates adopted by an Office
  //
  // Parameters: 
  //    id: The id of the Office that adopted the Schema Templates
  //
  // Return: An Observable array of Schema Templates adopted by the Office
  //
  GetSchemaTemplates(id: String) {
    const pathURL = environment.schemaTemplateAPI + environment.listSchemaTemplatesFunction + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
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
    const pathURL = environment.schemaTemplateAPI + id;
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
    const pathURL = environment.workpackTemplateAPI + environment.listWorkpackTemplatesFunction + id;
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
    const pathURL = environment.workpackTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, WorkpackTemplate>(res => res));
  }




}
