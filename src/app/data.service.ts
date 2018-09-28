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
import { SpinnerService } from './spinner.service';
import { delay } from 'q';

export class Panel {
  action: String = '';
  title: String = '';
  showForm: Boolean = false;
  showChildren: Boolean = true;
}

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

  // Observable property for the full tree on selected workpack template
  private $workpackTemplateTree = new BehaviorSubject<WorkpackTemplate>(new WorkpackTemplate);
  workpackTemplateTree = this.$workpackTemplateTree.asObservable();

  // Observable property for current show status of the workpack page 
  private $panel = new BehaviorSubject<Panel>(new Panel());
  panel = this.$panel.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService) {
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
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(res => {
      this.$offices.next(res as Office[]);
      this.spinnerService.HideSpinner();
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
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(res => {
      this.$office.next(res as Office);
      this.spinnerService.HideSpinner();
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
      return this.office;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any,Office>(res => {
        this.spinnerService.HideSpinner();
        return res;
      }));
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
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(office), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Office>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(office), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Office>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
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
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(res => {
      this.$schema.next(res as Schema);
      this.spinnerService.HideSpinner();
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
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<any, Workpack>(res => {
              this.$workpack.next(res as Workpack);
              this.spinnerService.HideSpinner();
              return res as Workpack;
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
  GetWorkpackById(id: String): Observable<Workpack> {
    const pathURL = environment.workpackAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return null;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any,Workpack>(res =>{
        this.spinnerService.HideSpinner();
        return res;
      }));
    }
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

    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(workpack), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Workpack>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
  QuerySchemaTemplateById(id: String) {
    const pathURL = environment.schemaTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).subscribe(res => {
      this.$schemaTemplate.next(res as SchemaTemplate);
      this.spinnerService.HideSpinner();
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
  // Run the GET http request to query a Workpack Template by id
  //
  // Parameters: 
  //    id: The id of the Workpack Template to be retrieved
  //
  // Return: An Observable to the Workpack Template
  //
  QueryWorkpackTemplateById(id: String): Observable<WorkpackTemplate> {
    const pathURL = environment.workpackTemplateAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<any, WorkpackTemplate>(res => {
              this.$workpackTemplate.next(res as WorkpackTemplate);
              this.spinnerService.HideSpinner();
              return res as WorkpackTemplate;
            }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a tree of Workpack Templates 
  //  and its siblings
  //
  // Parameters: 
  //    id: The id of the root Workpack Template
  //
  // Return: An Observable to the root Workpack Template
  //
  QueryWorkpackTemplateTree(id: String){
    const pathURL = environment.workpackTemplateAPI + environment.treeResource + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this
      .http
      .get(URL)
      .subscribe(res => {
        this.$workpackTemplateTree.next(res as WorkpackTemplate);
        this.spinnerService.HideSpinner();
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
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, WorkpackTemplate>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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

    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(workpackTemplate), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, WorkpackTemplate>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
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
  // Clean the Schema Template Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanSchemaTemplate() {
    this.$schemaTemplate.next(new SchemaTemplate);
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

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Workpack Template Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpackTemplate() {
    this.$workpackTemplate.next(new WorkpackTemplate);
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Set the Panel observable
  //
  // Parameters: action
  //
  // Return: none
  //
  SetPanel(action: String) {
    let panel = new Panel();
    panel.action = action;
    panel.showForm = (action != 'children');
    panel.showChildren = ((action == 'children') || (action == 'detail'));

    switch (panel.action) {
      case 'new2schema': {
        panel.title = 'New';
        break;
      }
      case 'new2schematemplate': {
        panel.title = 'New';
        break;
      }
      case 'edit': {
        panel.title = 'Edit';
        break;
      }
      case 'new2workpack': {
        panel.title = 'New';
        break;
      }
      case 'new2workpacktemplate': {
        panel.title = 'New Workpack Template';
        break;
      }
    }

    this.$panel.next(panel);
  }  

}
