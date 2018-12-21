import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Locality } from 'src/app/model/locality';
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
export class LocalityDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private errMessage: ErrorMessagingService,
              private util: Util) {
  }  

  // Observable property for the array of localityanizations
  private $localities = new BehaviorSubject<Locality[]>([]);
  localities = this.$localities.asObservable();

  // Observable property for the selected localityanization
  private $locality = new BehaviorSubject<Locality>(new Locality);
  locality = this.$locality.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Localityanizations
  // 
  // Return: none
  // 
  QueryLocalities(){
    const pathURL = environment.localityAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$localities.next(res as Locality[]);
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
  // Run a GET http request to query an Localityanization by its id
  //
  // Parameters: 
  //    id: The id of the localityanization to retrieve
  //
  // Return: none
  //
  QueryLocalityById(id: String): Observable<Locality> {
    const pathURL = environment.localityAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<Locality, any>(
              (res) => {
                this.$locality.next(res as Locality);
                this.spinnerService.HideSpinner();
                return res as Locality;
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
  // Run a GET http request to query a Locality by its id
  //
  // Parameters: 
  //    id: The id of the Locality to retrieve
  //
  // Return: Observable to the locality found
  //
  GetLocalityById(id: String): Observable<Locality> {
    const pathURL = environment.localityAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.locality;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Locality, any>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res as Locality;
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
  // Run a GET http request for the list of Localityanizations that has a given string
  // in the name or full name
  // 
  // Parameter: 
  //    name: string containing a scrap of the name being searched 
  //
  // Return: none
  // 
  QueryLocalitiesByName(nameScrap: string){
    const pathURL = environment.localityAPI + environment.likeResource;
    const URL = this.baseURL + this.basePathURL + pathURL + nameScrap;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$localities.next(res as Locality[]);
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
  // Run a POST http save a new Locality
  //
  // Parameters: 
  //    locality: The locality object to save
  //
  // Return: error if something went wrong
  //
  SaveLocality(locality: Locality): Observable<Locality> {
    const pathURL = environment.localityAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      this.util.JSONStringfyOmitNull(locality), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Locality, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$locality.next(res);
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
  // Run a PUT http to update a Locality
  //
  // Parameters: 
  //    locality: The Locality object to update
  //
  // Return: error if something went wrong
  //
  UpdateLocality(locality: Locality): Observable<Locality> {
    const pathURL = environment.localityAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + locality.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      this.util.JSONStringfyOmitNull(locality), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Locality, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$locality.next(res);
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
  // Run a DELETE http to remove a locality from the records
  //
  // Parameters: 
  //    id: The id of the locality to remove
  //
  // Return: error if something went wrong
  //
  DeleteLocality(id: String): Observable<Locality> {
    const pathURL = environment.localityAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Locality, any>(
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
  // Clean the Localityanization Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanLocality() {
    this.$locality.next(new Locality);
  }  
}
