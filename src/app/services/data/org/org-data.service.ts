import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Org } from 'src/app/model/org';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { map, catchError } from 'rxjs/operators';
import { AuthClientHttp } from 'src/app/security/auth-client-http';
import { Util } from 'src/app/utils';
import { ErrorMessagingService } from '../../error/error-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class OrgDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private errMessage: ErrorMessagingService,
              private util: Util) {
  }  

  // Observable property for the array of organizations
  private $orgs = new BehaviorSubject<Org[]>([]);
  orgs = this.$orgs.asObservable();

  // Observable property for the selected organization
  private $org = new BehaviorSubject<Org>(new Org);
  org = this.$org.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

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
        this.errMessage.ShowErrorMessage(error);
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
            .pipe(map<Org, any>(
              (res) => {
                this.$org.next(res as Org);
                this.spinnerService.HideSpinner();
                return res as Org;
              }),
              catchError(
                (err) => {
                  this.spinnerService.HideSpinner();
                  this.errMessage.ShowErrorMessage(err);
                  return err;
                }
              )
            );
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
  GetOrgById(id: String): Observable<Org> {
    const pathURL = environment.orgAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.org;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Org, any>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res as Org;
        }),
        catchError(
          (err) => {
            this.spinnerService.HideSpinner();
            this.errMessage.ShowErrorMessage(err);
            return err;
          }
        )
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Organizations that has a given string
  // in the name or full name
  // 
  // Parameter: 
  //    name: string containing a scrap of the name being searched 
  //
  // Return: none
  // 
  QueryOrgsByName(nameScrap: string){
    const pathURL = environment.orgAPI + environment.likeResource;
    const URL = this.baseURL + this.basePathURL + pathURL + nameScrap;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$orgs.next(res as Org[]);
        this.spinnerService.HideSpinner();
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.errMessage.ShowErrorMessage(error);
      }
    );
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
      this.util.JSONStringfyOmitNull(org), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Org, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$org.next(res);
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.errMessage.ShowErrorMessage(err);
          return err;
        }
      )
    );
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
      this.util.JSONStringfyOmitNull(org), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Org, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$org.next(res);
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.errMessage.ShowErrorMessage(err);
          return err;
        }
      )
    );
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
  RemoveOrg(id: String): Observable<Org> {
    const pathURL = environment.orgAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Org, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.errMessage.ShowErrorMessage(err);
          return err;
        }
      )
    );
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
