import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Workpack } from '../../../model/workpack';
import { WorkpackModel } from '../../../model/workpack-model';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';

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

  // Observable property for the array of workpack models
  private $workpackModels = new BehaviorSubject<WorkpackModel[]>([]);
  workpackModels = this.$workpackModels.asObservable();

  // Observable property for the selected workpack model
  private $workpackModel = new BehaviorSubject<WorkpackModel>(new WorkpackModel);
  workpackModel = this.$workpackModel.asObservable();

  // Observable property for the full tree on selected workpack model
  private $workpackModelTree = new BehaviorSubject<WorkpackModel>(new WorkpackModel);
  workpackModelTree = this.$workpackModelTree.asObservable();

  // Observable property for the list of property types available
  private $propertyTypes = new BehaviorSubject<String[]>([]);
  propertyTypes = this.$propertyTypes.asObservable();

  // Observable property for current show status of the workpack page 
  private $panel = new BehaviorSubject<Panel>(new Panel());
  panel = this.$panel.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService,
              public dialog: MatDialog) {
  }

  ///////////////////////////////////////////////////////////////////////
  //
  // Show an error message in a modal dialog box
  // 
  // Return: none
  // 
  ShowErrorMessagee(error){
    this.dialog.open(MessageDialogComponent, { 
      data: {
        title: error.statusText,
        message: error.message,
        action: "OK"
      }
    });    
  }  


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Plan by id
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
            .pipe(map<any, Workpack>(
              (res) => {
                if (res.properties[0] == undefined) {
                  res.properties = [];
                }
                this.$workpack.next(res as Workpack);
                this.spinnerService.HideSpinner();
                return res as Workpack;
              },
              (error) => {
                this.spinnerService.HideSpinner();
                this.ShowErrorMessagee(error);
              }
            ));
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
      return this.http.get(URL).pipe(map<any,Workpack>(
        (res) =>{
          if (res.properties[0] == undefined) {
            res.properties = [];
          }
          this.spinnerService.HideSpinner();
          return res;
        },
        (error) => {
          this.spinnerService.HideSpinner();
          this.ShowErrorMessagee(error);
        }
      ));
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
    ).pipe(map<any, Workpack>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
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
    return this.http.delete(URL).pipe(map<any, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack Model by id
  //
  // Parameters: 
  //    id: The id of the Workpack Model to be retrieved
  //
  // Return: An Observable to the Workpack Model
  //
  QueryWorkpackModelById(id: String): Observable<WorkpackModel> {
    const pathURL = environment.workpackModelAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<any, WorkpackModel>(
              (res) => {
                this.$workpackModel.next(res as WorkpackModel);
                this.spinnerService.HideSpinner();
                return res as WorkpackModel;
              },
              (error) => {
                this.spinnerService.HideSpinner();
                this.ShowErrorMessagee(error);
              }
            ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a tree of Workpack Models 
  //  and its siblings
  //
  // Parameters: 
  //    id: The id of the root Workpack Model
  //
  // Return: An Observable to the root Workpack Model
  //
  QueryWorkpackModelTree(id: String){
    // const pathURL = environment.workpackModelAPI + environment.treeResource + id;
    // const URL = this.baseURL + this.basePathURL + pathURL;
    // this.spinnerService.ShowSpinner();
    // this
    //   .http
    //   .get(URL)
    //   .subscribe(
    //     (res) => {
    //       this.$workpackModelTree.next(res as WorkpackModel);
    //       this.spinnerService.HideSpinner();
    //     },
    //     (error) => {
    //       this.spinnerService.HideSpinner();
    //       this.ShowErrorMessagee(error);
    //     }
    //   );
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
    const pathURL = environment.workpackModelAPI + environment.propertyTypesResource;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any,String[]>(
      (res) => {
        if (res.length > 0) {
          this.$propertyTypes.next(res as String[]);
        }
        this.spinnerService.HideSpinner();
        return res as String[];
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Workpack Model by id
  //
  // Parameters: 
  //    id: The id of the Workpack Model to be retrieved
  //
  // Return: An Observable Workpack Model retrieved
  //
  GetWorkpackModelById(id: String): Observable<WorkpackModel> {
    const pathURL = environment.workpackModelAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, WorkpackModel>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to get a Workpack Model with default values
  //
  // Parameters: none
  //
  // Return: An Observable to the Workpack Model retrieved
  //
  QueryDefaultWorkpackModel(): Observable<WorkpackModel> {
 
    const pathURL = environment.workpackModelAPI + environment.defaultResource;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, WorkpackModel>(
      (res) => {
        this.$workpackModel.next(res as WorkpackModel);
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Workpack Model
  //
  // Parameters: 
  //    plan: The Workpack Model object to update
  //
  // Return: error if something went wrong
  //
  UpdateWorkpackModel(workpackModel: WorkpackModel): Observable<WorkpackModel> {
    const pathURL = environment.workpackModelAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + workpackModel.id;

    //this.propertyDataService.UpdateProperties(workpackModel.properties);

    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(workpackModel), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, WorkpackModel>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Workpack Model
  //
  // Parameters: 
  //    id: The id of the Workpack Model to delete
  //
  // Return: error if something went wrong
  //
  DeleteWorkpackModel(id: String): Observable<any> {
    const pathURL = environment.workpackModelAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
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
  // Clean the Workpack Model Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpackModel() {
    this.$workpackModel.next(new WorkpackModel);
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
      case 'new2Plan': {
        panel.title = 'New';
        break;
      }
      case 'new2Planmodel': {
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
      case 'new2workpackModel': {
        panel.title = 'New Workpack Model';
        break;
      }
    }

    this.$panel.next(panel);
  }  

}
