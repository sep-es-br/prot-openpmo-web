import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office } from './model/office';
import { Schema } from './model/schema';
import { Workpack } from './model/workpack';
import { SchemaTemplate } from './model/schema-template';
import { WorkpackTemplate } from './model/workpack-template';
import { environment } from 'src/environments/environment';
import { Panel } from './model/panel';



/* Object type to receive the response from the http request */

@Injectable({
  providedIn: 'root'
})

export class DataService {

 
  // Observable property for the array of offices
  private $offices = new BehaviorSubject<Office[]>([]);
  offices = this.$offices.asObservable();

  // Observable property for the selected office
  private $office = new BehaviorSubject<Office>(new Office);
  office = this.$office.asObservable();

  // Observable property for the array of schemas
  private $schemas = new BehaviorSubject<Schema[]>([]);
  schemas = this.$schemas.asObservable();

  // Observable property for the selected schema
  private $schema = new BehaviorSubject<Schema>(new Schema);
  schema = this.$schema.asObservable();

  // Observable property for the array of schema templates
  private $schemaTemplates = new BehaviorSubject<SchemaTemplate[]>([]);
  schemaTemplates = this.$schemaTemplates.asObservable();

  // Observable property for the selected workpack template
  private $schemaTemplate = new BehaviorSubject<SchemaTemplate>(new SchemaTemplate);
  schemaTemplate = this.$schemaTemplate.asObservable();

  // Observable property for the array of workpacks
  private $workpacks = new BehaviorSubject<Workpack[]>([]);
  workpacks = this.$workpacks.asObservable();

  // Observable property for the selected workpack
  private $workpack = new BehaviorSubject<Workpack>(new Workpack);
  workpack = this.$workpack.asObservable();

  // Observable property for the path of workpacks
  private $workpath = new BehaviorSubject<Workpack[]>([]);
  workpath = this.$workpath.asObservable();

  // Observable property for the array of workpack templates
  private $workpackTemplates = new BehaviorSubject<WorkpackTemplate[]>([]);
  workpackTemplates = this.$workpackTemplates.asObservable();

  // Observable property for the selected workpack template
  private $workpackTemplate = new BehaviorSubject<WorkpackTemplate>(new WorkpackTemplate);
  workpackTemplate = this.$workpackTemplate.asObservable();

  // Observable property for the path of workpacks
  private $templatePath = new BehaviorSubject<WorkpackTemplate[]>([]);
  templatePath = this.$templatePath.asObservable();

  // Observable property for the path of workpacks
  private $panel = new BehaviorSubject<Panel>(new Panel);
  panel = this.$panel.asObservable();

  private baseURL = environment.databaseHost;
  // private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";

  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient) {
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Offices
  // 
  // Return: none
  // 
  QueryOffices(){
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.http.get(URL).subscribe(res => {
      this.$offices.next(res as Office[]);
    });
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query an Office by its id
  //
  // Parameters: 
  //    id: The id of the Office to retrieve
  //
  // Return: none
  //
  QueryOfficeById(id: String) {
    const pathURL = environment.officeAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.http.get(URL).subscribe(res => {
      this.$office.next(res as Office);
    });
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query an Office by its id
  //
  // Parameters: 
  //    id: The id of the Office to retrieve
  //
  // Return: Observable to the office found
  //
  GetOfficeById(id: String) {
    const pathURL = environment.officeAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      this.$office.next(new Office);
      return this.office;
    }
    else {
      this.http.get(URL).subscribe(res => {
        this.$office.next(res as Office);
        return this.office;
      });
    }
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
  // Run a PUT http to update an Office
  //
  // Parameters: 
  //    office: The Office object to update
  //
  // Return: error if something went wrong
  //
  UpdateOffice(office: Office): Observable<Office> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + office.id;
    console.log('office', office);
    console.log('URL', URL);
    return this.http.put(
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
  // Run the GET http to query a Schema by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: none
  //
  QuerySchemaById(id: String) {
    const pathURL = environment.schemaAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.http.get(URL).subscribe(res => {
      this.$schema.next(res as Schema);
    });
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http ro request a Schema by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: An observable to the schema
  //
  GetSchemaById(id: String): Observable<Schema> {
    const pathURL = environment.schemaAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      this.$schema.next(new Schema);
      return this.schema;
    }
    else {
      this.http.get(URL).subscribe(res => {
        this.$schema.next(res as Schema);
        return this.schema;
      });
    }
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save a Schema
  //
  // Parameters: 
  //    schema: The Schema object to save
  //
  // Return: error if something went wrong
  //
  SaveSchema(schema: Schema, parentOffice: Office): Observable<Schema> {
    const pathURL = environment.schemaAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + parentOffice;
    return this.http.post(
      URL, 
      JSON.stringify(schema), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Schema>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Schema
  //
  // Parameters: 
  //    schema: The Schema object to update
  //
  // Return: error if something went wrong
  //
  UpdateSchema(schema: Schema): Observable<Schema> {
    const pathURL = environment.schemaAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + schema.id;

    console.log('URL', URL);
    console.log('schema', schema);
    
    return this.http.put(
      URL, 
      JSON.stringify(schema), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Schema>(res => res));
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Schema
  //
  // Parameters: 
  //    id: The id of the Schema to delete
  //
  // Return: error if something went wrong
  //
  DeleteSchema(id: String): Observable<any> {
    const pathURL = environment.schemaAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    return this.http.delete(URL).pipe(map<any, any>(res => res));
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
    return this.http.get(URL).pipe(map<any, any>(res => {
      this.$workpacks.next(res as Workpack[]);
    }));


  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: none
  //
  QueryWorkpackById(id: String) {
    const pathURL = environment.workpackAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.http.get(URL).subscribe(res => {
      this.$workpack.next(res as Workpack);
      this.Set2Workpath(this.$workpack.value);
    });
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
  GetWorkpackById(id: String): Observable<Workpack> {
    const pathURL = environment.workpackAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      this.$workpack.next(new Workpack);
    }
    else {
      this.http.get(URL).subscribe(res => {
        this.$workpack.next(res as Workpack);
      });
    }
    return this.workpack;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Workpack
  //
  // Parameters: 
  //    workpack: The Workpack object to update
  //
  // Return: error if something went wrong
  //
  UpdateWorkpack(workpack: Workpack): Observable<Workpack> {
    const pathURL = environment.workpackAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + workpack.id;

    return this.http.put(
      URL, 
      JSON.stringify(workpack), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Workpack>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Workpack
  //
  // Parameters: 
  //    id: The id of the Workpack to delete
  //
  // Return: error if something went wrong
  //
  DeleteWorkpack(id: String): Observable<any> {
    const pathURL = environment.workpackAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    return this.http.delete(URL).pipe(map<any, any>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Set a workpack to be the leaf of the path. If it is already in the path,
  // pops all further items, otherwise just add it
  //
  // Parameters: 
  //    workpack: The workpack to be set as leaf
  //
  // Return: void
  //
  Set2Workpath(workpack: Workpack) {
    let foundIndex = this.$workpath.value.findIndex(w => w.id == workpack.id);
    // If the workpack is already in the path...
    if (foundIndex != -1) {
      for (let i=this.$workpath.value.length-1; i>foundIndex; i--) {
        this.$workpath.value.pop();
      }
    }
    else{
      this.$workpath.value.push(workpack);
    }
    this.$workpath.next(this.$workpath.value);
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
    return this.http.get(URL).pipe(map<any, any>(res => {
      this.$schemaTemplates.next(res as SchemaTemplate[]);
    }));

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
  // GetSchemaTemplateById(id: String) {
  //   const pathURL = environment.schemaTemplateAPI + id;
  //   const URL = this.baseURL + this.basePathURL + pathURL;
  //   return this.http.get(URL).pipe(map<any, any>(res => {
  //     this.$selectedSchemaTemplate.next(res);
  //   }));
  // }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema Template by id
  //
  // Parameters: 
  //    id: The id of the Schema Template to retrieve
  //
  // Return: none
  //
  QuerySchemaTemplateById(id: String) {
    const pathURL = environment.schemaTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).subscribe(res => {
      this.$schemaTemplate.next(res as SchemaTemplate);
    });
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Schema Template
  //
  // Parameters: 
  //    schema: The Schema Template object to update
  //
  // Return: error if something went wrong
  //
  UpdateSchemaTemplate(schemaTemplate: SchemaTemplate): Observable<SchemaTemplate> {
    const pathURL = environment.schemaTemplateAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + schemaTemplate.id;

    return this.http.put(
      URL, 
      JSON.stringify(schemaTemplate), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, SchemaTemplate>(res => res));
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Schema Template
  //
  // Parameters: 
  //    id: The id of the Schema Template to delete
  //
  // Return: error if something went wrong
  //
  DeleteSchemaTemplate(id: String): Observable<any> {
    const pathURL = environment.schemaTemplateAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    return this.http.delete(URL).pipe(map<any, any>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http ro request a Schema Template by id
  //
  // Parameters: 
  //    id: The id of the Schema Template to be retrieved
  //
  // Return: An observable to the schema template
  //
  GetSchemaTemplateById(id: String): Observable<SchemaTemplate> {
    const pathURL = environment.schemaTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, SchemaTemplate>(res => res as SchemaTemplate));
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
    return this.http.get(URL).pipe(map<any, any>(res => {
      this.$workpackTemplates.next(res as WorkpackTemplate[]);
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack Template by id
  //
  // Parameters: 
  //    id: The id of the Workpack Template to be retrieved
  //
  // Return: none
  //
  QueryWorkpackTemplateById(id: String) {
    const pathURL = environment.workpackTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.http.get(URL).subscribe(res => {
      this.$workpackTemplate.next(res as WorkpackTemplate);
    });
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
  GetWorkpackTemplateById(id: String): Observable<WorkpackTemplate> {
    const pathURL = environment.workpackTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    return this.http.get(URL).pipe(map<any, WorkpackTemplate>(res => res as WorkpackTemplate));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Workpack Template
  //
  // Parameters: 
  //    schema: The Workpack Template object to update
  //
  // Return: error if something went wrong
  //
  UpdateWorkpackTemplate(workpackTemplate: WorkpackTemplate): Observable<WorkpackTemplate> {
    const pathURL = environment.workpackTemplateAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + workpackTemplate.id;

    return this.http.put(
      URL, 
      JSON.stringify(workpackTemplate), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, WorkpackTemplate>(res => res));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Workpack Template
  //
  // Parameters: 
  //    id: The id of the Workpack Template to delete
  //
  // Return: error if something went wrong
  //
  DeleteWorkpackTemplate(id: String): Observable<any> {
    const pathURL = environment.workpackTemplateAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    return this.http.delete(URL).pipe(map<any, any>(res => res));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set a workpack template to be the leaf of the path. If it is already in the path,
  // pops all further items, otherwise just add it
  //
  // Parameters: 
  //    workpackTemplate: The workpack template to be set as leaf
  //
  // Return: void
  //
  Set2Templatepath(workpackTemplate: WorkpackTemplate) {
    let foundIndex = this.$templatePath.value.findIndex(w => w.id == workpackTemplate.id);
    // If the workpack is already in the path...
    if (foundIndex != -1) {
      for (let i=this.$templatePath.value.length-1; i>foundIndex; i--) {
        this.$templatePath.value.pop();
      }
    }
    else{
      this.$templatePath.value.push(workpackTemplate);
    }
    this.$templatePath.next(this.$templatePath.value);
  }

  SetPanel(panel: Panel) {
    this.$panel.next(panel);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Office Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanOffice() {
    this.$office.next(new Office);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Schema Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanSchema() {
    this.$schema.next(new Schema);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Workpack Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpack() {
    this.$workpack.next(new Workpack);
  }
}
