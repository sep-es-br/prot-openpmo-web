import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Workpack } from '../../../model/workpack';
import { WorkpackTemplate } from '../../../model/workpack-template';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../spinner/spinner.service';

export class Panel {
  action: String = '';
  title: String = '';
  showForm: Boolean = false;
  showChildren: Boolean = true;
}

@Injectable({
  providedIn: 'root'
})
export class WorkpackDataService {
 
  // Observable property for the array of workpacks
  private $workpacks = new BehaviorSubject<Workpack[]>([]);
  workpacks = this.$workpacks.asObservable();

  // Observable property for the selected workpack
  private $workpack = new BehaviorSubject<Workpack>(new Workpack);
  workpack = this.$workpack.asObservable();

  // Observable property for the array of workpack templates
  private $workpackTemplates = new BehaviorSubject<WorkpackTemplate[]>([]);
  workpackTemplates = this.$workpackTemplates.asObservable();

  // Observable property for the selected workpack template
  private $workpackTemplate = new BehaviorSubject<WorkpackTemplate>(new WorkpackTemplate);
  workpackTemplate = this.$workpackTemplate.asObservable();

  // Observable property for the full tree on selected workpack template
  private $workpackTemplateTree = new BehaviorSubject<WorkpackTemplate>(new WorkpackTemplate);
  workpackTemplateTree = this.$workpackTemplateTree.asObservable();

  // Observable property for the list of property types available
  private $propertyTypes = new BehaviorSubject<String[]>([]);
  propertyTypes = this.$propertyTypes.asObservable();

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
              if (res.properties[0] == undefined) {
                res.properties = [];
              }
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
        if (res.properties[0] == undefined) {
          res.properties = [];
        }
        this.spinnerService.HideSpinner();
        return res;
      }));
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the workpack observable variable
  //
  // Parameters: 
  //    workpack: The Workpack object to be set
  //
  // Return: none
  //
  SetWorkpack(workpack: Workpack) {
    this.$workpack.next(workpack);
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
  // Run a GET http request to query all property types available
  //
  // Parameters: none
  //
  // Return: Observable to the property types list
  //
  QueryPropertyTypes(): Observable<String[]> {
    const pathURL = environment.workpackTemplateAPI + environment.propertyTypesResource;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any,String[]>(res => {
      if (res.length > 0) {
        this.$propertyTypes.next(res as String[]);
      }
      this.spinnerService.HideSpinner();
      return res as String[];
    }));
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
  // Run the GET http request to get a Workpack Template with default values
  //
  // Parameters: none
  //
  // Return: An Observable to the Workpack Template retrieved
  //
  QueryDefaultWorkpackTemplate(): Observable<WorkpackTemplate> {
 
    const pathURL = environment.workpackTemplateAPI + environment.defaultResource;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, WorkpackTemplate>(res => {
      this.$workpackTemplate.next(res as WorkpackTemplate);
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

    //this.propertyDataService.UpdateProperties(workpackTemplate.properties);

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
