import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Role } from 'src/app/model/role';
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
export class RoleDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private util: Util,
              private errMessage: ErrorMessagingService) {
  }  


  // Observable property for the selected role
  private $role = new BehaviorSubject<Role>(new Role);
  role = this.$role.asObservable();

  // Observable property for the list of roles
  private $roles = new BehaviorSubject<Role[]>([]);
  roles = this.$roles.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get all Roles
  //
  // Parameters: none
  //
  // Return: Observable to the roles found
  //
  GetAllRoles(): Observable<Role[]> {
    const pathURL = environment.roleAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Role[], any>(
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
  // Run a GET http request to get all Roles
  //
  // Parameters: none
  //
  // Return: Observable to the roles found
  //
  QueryAllRoles(): Observable<Role[]> {
    const pathURL = environment.roleAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Role[], any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$roles.next(res as Role[]);
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
  // Run a GET http request to get all Roles related to a scope
  //
  // Parameters: 
  //    id: The id of the scope
  //
  // Return: Observable to the roles found
  //
  GetAllRolesByScopeId(id: String): Observable<Role[]> {
    const pathURL = environment.roleAPI + environment.byScopeIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL + id;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Role[], any>(
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
  // Run a GET http request to get all Roles related to a scope
  //
  // Parameters: 
  //    id: The id of the scope
  //
  // Return: none
  //
  QueryAllRolesByScopeId(id: String){
    const pathURL = environment.roleAPI + environment.byScopeIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL + id;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).subscribe(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$roles.next(res as Role[]);
      },
      (err) => {
        this.spinnerService.HideSpinner();
        this.errMessage.ShowErrorMessage(err);
      }
    );
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get all Roles related to an actor
  //
  // Parameters: 
  //    id: The id of the actor
  //
  // Return: Observable to the roles found
  //
  GetAllRolesByActorId(): Observable<Role[]> {
    const pathURL = environment.roleAPI + environment.byActorIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Role[], any>(
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
  // Run a GET http request to get all Roles related to an actor
  //
  // Parameters: 
  //    id: The id of the actor
  //
  // Return: Observable to the roles found
  //
  QueryAllRolesByActorId(): Observable<Role[]> {
    const pathURL = environment.roleAPI + environment.byActorIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Role[], any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$roles.next(res as Role[]);
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
  // Run a GET http request to query a Role by its id
  //
  // Parameters: 
  //    id: The id of the role to retrieve
  //
  // Return: none
  //
  QueryRoleById(id: String): Observable<Role> {
    const pathURL = environment.roleAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<Role, any>(
              (res) => {
                this.$role.next(res as Role);
                this.spinnerService.HideSpinner();
                return res as Role;
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
  // Run a GET http request to query a Role by its id
  //
  // Parameters: 
  //    id: The id of the Role to retrieve
  //
  // Return: Observable to the role found
  //
  GetRoleById(id: String): Observable<Role> {
    const pathURL = environment.roleAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.role;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Role, any>(
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
  // Run a POST http save a new Role
  //
  // Parameters: 
  //    role: The role object to save
  //
  // Return: error if something went wrong
  //
  SaveRole(role: Role): Observable<Role> {
    const pathURL = environment.roleAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    // role.actor = { id: role.actor.id };

    // role.scope = { id: role.scope.id };

    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      this.util.JSONStringfyOmitNull(role), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Role,any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$role.next(res);
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
  // Run a PUT http to update a Role
  //
  // Parameters: 
  //    role: The Role object to update
  //
  // Return: error if something went wrong
  //
  UpdateRole(role: Role): Observable<Role> {
    const pathURL = environment.roleAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + role.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      this.util.JSONStringfyOmitNull(role), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Role, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$role.next(res);
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
  // Run a DELETE http to remove a role from the records
  //
  // Parameters: 
  //    id: The id of the role to remove
  //
  // Return: error if something went wrong
  //
  RemoveRole(id: String): Observable<Role> {
    const pathURL = environment.roleAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Role, any>(
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
  CleanRole() {
    this.$role.next(new Role);
  }  
}
