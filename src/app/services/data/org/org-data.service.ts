import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Org } from 'src/app/model/org';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrgDataService {

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService,
              public dialog: MatDialog) {
  }  

  // Observable property for the array of organizations
  private $orgs = new BehaviorSubject<Org[]>([]);
  orgs = this.$orgs.asObservable();

  // Observable property for the selected organization
  private $org = new BehaviorSubject<Org>(new Org);
  org = this.$org.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;



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
  // Run a GET http request for the list of Organizations
  // 
  // Return: none
  // 
  QueryOrgs(){
    const pathURL = environment.orgAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$orgs.next(res as Org[]);
        this.spinnerService.HideSpinner();
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query an Organization by its id
  //
  // Parameters: 
  //    id: The id of the organization to retrieve
  //
  // Return: none
  //
  QueryOrgById(id: String): Observable<Org> {
    const pathURL = environment.orgAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<any, Org>(
              (res) => {
                this.$org.next(res as Org);
                this.spinnerService.HideSpinner();
                return res as Org;
              },
              (error) => {
                this.spinnerService.HideSpinner();
                this.ShowErrorMessagee(error);
              }
            ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query a Org by its id
  //
  // Parameters: 
  //    id: The id of the Org to retrieve
  //
  // Return: Observable to the org found
  //
  GetOrgById(id: String) {
    const pathURL = environment.orgAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.org;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any,Org>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res as Org;
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
  // Run a POST http save a new Org
  //
  // Parameters: 
  //    org: The org object to save
  //
  // Return: error if something went wrong
  //
  SaveOrg(org: Org): Observable<Org> {
    const pathURL = environment.orgAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(org), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Org>(
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
  // Run a PUT http to update a Org
  //
  // Parameters: 
  //    org: The Org object to update
  //
  // Return: error if something went wrong
  //
  UpdateOrg(org: Org): Observable<Org> {
    const pathURL = environment.orgAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + org.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(org), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Org>(
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
  // Run a DELETE http to remove a org from the records
  //
  // Parameters: 
  //    id: The id of the org to remove
  //
  // Return: error if something went wrong
  //
  RemoveOrg(id: String): Observable<any> {
    const pathURL = environment.orgAPI;
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
  // Clean the Organization Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanOrg() {
    this.$org.next(new Org);
  }  
}
