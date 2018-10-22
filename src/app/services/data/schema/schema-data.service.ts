import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Office } from '../../../model/office';
import { Schema } from '../../../model/schema';
import { SchemaTemplate } from '../../../model/schema-template';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SchemaDataService {
 
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

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService) {
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
  QuerySchemaById(id: String): Observable<Schema> {
    const pathURL = environment.schemaAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
//    this.spinnerService.ShowSpinner();
    return this.http.get(URL)
    .pipe(
      map<any, Schema>(
        (res,err) => {
          this.$schema.next(res as Schema);
          this.spinnerService.HideSpinner();
          return res as Schema;
        }
      ),
      catchError(
        (err) => {
          console.log(err);
          return new Observable<Schema>();
        }
      )
    );
  }

  errorHandler(e): Observable<any> {
    return Observable.throw(e || 'Internal Server error');
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
      return null;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any, Schema>(res => {
        this.spinnerService.HideSpinner();
        return res;
      }));
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
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(schema), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Schema>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(schema), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Schema>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Schema Template by id
  //
  // Parameters: 
  //    id: The id of the Schema Template to retrieve
  //
  // Return: none
  //
  QuerySchemaTemplateById(id: String): Observable<SchemaTemplate> {
    const pathURL = environment.schemaTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http
      .get(URL)
      .pipe(map<any,SchemaTemplate>(res => {
        this.$schemaTemplate.next(res as SchemaTemplate);
        this.spinnerService.HideSpinner();
        return res as SchemaTemplate;
      }));
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

    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(schemaTemplate), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, SchemaTemplate>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, SchemaTemplate>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
  // Clean the Schema Template Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanSchemaTemplate() {
    this.$schemaTemplate.next(new SchemaTemplate);
  }

}
