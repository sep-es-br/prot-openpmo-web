import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Actor } from 'src/app/model/actor';
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
export class ActorDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private errMessage: ErrorMessagingService,
              private util: Util) {
  }  

  // Observable property for the array of actoranizations
  private $actors = new BehaviorSubject<Actor[]>([]);
  actors = this.$actors.asObservable();

  // Observable property for the selected actoranization
  private $actor = new BehaviorSubject<Actor>(new Actor);
  actor = this.$actor.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Actoranizations
  // 
  // Return: none
  // 
  QueryActors(){
    const pathURL = environment.actorAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$actors.next(res as Actor[]);
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
  // Run a GET http request to query an Actoranization by its id
  //
  // Parameters: 
  //    id: The id of the actoranization to retrieve
  //
  // Return: none
  //
  QueryActorById(id: String): Observable<Actor> {
    const pathURL = environment.actorAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<Actor, any>(
              (res) => {
                this.$actor.next(res as Actor);
                this.spinnerService.HideSpinner();
                return res as Actor;
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
  // Run a GET http request to query a Actor by its id
  //
  // Parameters: 
  //    id: The id of the Actor to retrieve
  //
  // Return: Observable to the actor found
  //
  GetActorById(id: String): Observable<Actor> {
    const pathURL = environment.actorAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.actor;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Actor, any>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res as Actor;
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
  // Run a GET http request for the list of Actoranizations that has a given string
  // in the name or full name
  // 
  // Parameter: 
  //    name: string containing a scrap of the name being searched 
  //
  // Return: none
  // 
  QueryActorsByName(nameScrap: string){
    const pathURL = environment.actorAPI + environment.likeResource;
    const URL = this.baseURL + this.basePathURL + pathURL + nameScrap;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$actors.next(res as Actor[]);
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
  // Run a POST http save a new Actor
  //
  // Parameters: 
  //    actor: The actor object to save
  //
  // Return: error if something went wrong
  //
  SaveActor(actor: Actor): Observable<Actor> {
    const pathURL = environment.actorAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      this.util.JSONStringfyOmitNull(actor), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Actor, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$actor.next(res);
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
  // Run a PUT http to update a Actor
  //
  // Parameters: 
  //    actor: The Actor object to update
  //
  // Return: error if something went wrong
  //
  UpdateActor(actor: Actor): Observable<Actor> {
    const pathURL = environment.actorAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + actor.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      this.util.JSONStringfyOmitNull(actor), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Actor, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$actor.next(res);
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
  // Run a DELETE http to remove a actor from the records
  //
  // Parameters: 
  //    id: The id of the actor to remove
  //
  // Return: error if something went wrong
  //
  RemoveActor(id: String): Observable<Actor> {
    const pathURL = environment.actorAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Actor, any>(
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
  // Clean the Actoranization Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanActor() {
    this.$actor.next(new Actor);
  }  
}
