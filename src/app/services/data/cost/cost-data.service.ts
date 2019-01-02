import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Cost, CostEntry } from 'src/app/model/cost';
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
export class CostDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              private util: Util,
              private errMessage: ErrorMessagingService) {
  }  


  // Observable property for the selected cost
  private $cost = new BehaviorSubject<Cost>(new Cost);
  cost = this.$cost.asObservable();

  // Observable property for the list of costs
  private $costs = new BehaviorSubject<Cost[]>([]);
  costs = this.$costs.asObservable();

  // // Observable property for the selected cost entry
  // private $costEntry = new BehaviorSubject<CostEntry>(new CostEntry);
  // costEntry = this.$cost.asObservable();

  // // Observable property for the list of costs
  // private $costEntries = new BehaviorSubject<CostEntry[]>([]);
  // costEntries = this.$costEntries.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to get all Costs
  //
  // Parameters: none
  //
  // Return: Observable to the costs found
  //
  GetAllCosts(): Observable<Cost[]> {
    const pathURL = environment.costAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Cost[], any>(
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
  // Run a GET http request to get all Costs related to a scope
  //
  // Parameters: 
  //    id: The id of the scope
  //
  // Return: Observable to the costs found
  //
  GetAllCostsByWorkpackId(id: String): Observable<Cost[]> {
    const pathURL = environment.costAPI + environment.byWorkpackIdResource;
    const URL = this.baseURL + this.basePathURL + pathURL + id;

    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<Cost[], any>(
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
  // Run a GET http request to query a Cost by its id
  //
  // Parameters: 
  //    id: The id of the cost to retrieve
  //
  // Return: none
  //
  QueryCostById(id: String) {
    const pathURL = environment.costAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$cost.next(res as Cost);
        this.spinnerService.HideSpinner();
      },
      (err) => {
        this.spinnerService.HideSpinner();
        this.errMessage.ShowErrorMessage(err);
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query a Cost by its id
  //
  // Parameters: 
  //    id: The id of the Cost to retrieve
  //
  // Return: Observable to the cost found
  //
  GetCostById(id: String): Observable<Cost> {
    const pathURL = environment.costAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.cost;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Cost, any>(
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
  // Run a POST http save a new Cost
  //
  // Parameters: 
  //    cost: The cost object to save
  //
  // Return: error if something went wrong
  //
  SaveCost(cost: Cost): Observable<Cost> {
    const pathURL = environment.costAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;

    // cost.actor = { id: cost.actor.id };

    // cost.scope = { id: cost.scope.id };

    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      this.util.JSONStringfyOmitNull(cost), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Cost,any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$cost.next(res);
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
  // Run a PUT http to update a Cost
  //
  // Parameters: 
  //    cost: The Cost object to update
  //
  // Return: error if something went wrong
  //
  UpdateCost(cost: Cost): Observable<Cost> {
    const pathURL = environment.costAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + cost.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      this.util.JSONStringfyOmitNull(cost), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Cost, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$cost.next(res);
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
  // Run a DELETE http to remove a cost from the records
  //
  // Parameters: 
  //    id: The id of the cost to remove
  //
  // Return: error if something went wrong
  //
  RemoveCost(id: String): Observable<Cost> {
    const pathURL = environment.costAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Cost, any>(
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
  CleanCost() {
    this.$cost.next(new Cost);
  }  
}
