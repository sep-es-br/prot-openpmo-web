import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { GeoReference } from 'src/app/model/geo-reference';
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
export class GeoReferenceDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private util: Util,
              private errMessage: ErrorMessagingService) {
  }  


  // Observable property for the selected office
  private $geoReference = new BehaviorSubject<GeoReference>(new GeoReference);
  public geoReference = this.$geoReference.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get all GeoReferences
  //
  // Parameters: none
  //
  // Return: Observable to the related localities found
  //
  GetAllGeoReferences(): Observable<GeoReference[]> {
    const pathURL = environment.geoReferenceAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<GeoReference[], any>(
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
  // Run a GET http request to get all GeoReferences related to a scope
  //
  // Parameters: 
  //    id: The id of the scope
  //
  // Return: Observable to the related localities found
  //
  GetAllGeoReferencesByScopeId(): Observable<GeoReference[]> {
    const pathURL = environment.geoReferenceAPI + environment.byScopeIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<GeoReference[], any>(
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
  // Run a GET http request to get all GeoReferences related to a locality
  //
  // Parameters: 
  //    id: The id of the locality
  //
  // Return: Observable to the related localities found
  //
  GetAllGeoReferencesByLocalityId(): Observable<GeoReference[]> {
    const pathURL = environment.geoReferenceAPI + environment.byActorIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<GeoReference[], any>(
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
  // Run a GET http request to query a GeoReference by its id
  //
  // Parameters: 
  //    id: The id of the geoReference to retrieve
  //
  // Return: none
  //
  QueryGeoReferenceById(id: String): Observable<GeoReference> {
    const pathURL = environment.geoReferenceAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<GeoReference, any>(
              (res) => {
                this.$geoReference.next(res as GeoReference);
                this.spinnerService.HideSpinner();
                return res as GeoReference;
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
  // Run a GET http request to query a GeoReference by its id
  //
  // Parameters: 
  //    id: The id of the GeoReference to retrieve
  //
  // Return: Observable to the geoReference found
  //
  GetGeoReferenceById(id: String): Observable<GeoReference> {
    const pathURL = environment.geoReferenceAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.geoReference;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<GeoReference, any>(
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
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save a new GeoReference
  //
  // Parameters: 
  //    geoReference: The geoReference object to save
  //
  // Return: error if something went wrong
  //
  SaveGeoReference(geoReference: GeoReference) {
    const pathURL = environment.geoReferenceAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    // geoReference.actor = { id: geoReference.actor.id };

    // geoReference.scope = { id: geoReference.scope.id };

    this.spinnerService.ShowSpinner();
    this.http.post(
      URL, 
      this.util.JSONStringfyOmitNull(geoReference), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).subscribe(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$geoReference.next(res as GeoReference);
      },
      (err) => {
        this.spinnerService.HideSpinner();
        this.errMessage.ShowErrorMessage(err);
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a GeoReference
  //
  // Parameters: 
  //    geoReference: The GeoReference object to update
  //
  // Return: error if something went wrong
  //
  UpdateGeoReference(geoReference: GeoReference): Observable<GeoReference> {
    const pathURL = environment.geoReferenceAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + geoReference.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      this.util.JSONStringfyOmitNull(geoReference), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<GeoReference, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$geoReference.next(res);
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
  // Run a DELETE http to remove a geoReference from the records
  //
  // Parameters: 
  //    id: The id of the geoReference to remove
  //
  // Return: error if something went wrong
  //
  RemoveGeoReference(id: String): Observable<GeoReference> {
    const pathURL = environment.geoReferenceAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<GeoReference, any>(
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
  // Clean the Office Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanGeoReference() {
    this.$geoReference.next(new GeoReference);
  }  
}
