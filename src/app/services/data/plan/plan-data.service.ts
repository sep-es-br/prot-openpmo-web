import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Office } from '../../../model/office';
import { Plan } from '../../../model/plan';
import { PlanStructure } from '../../../model/plan-structure';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {
 
  // Observable property for the array of plans
  private $plans = new BehaviorSubject<Plan[]>([]);
  plans = this.$plans.asObservable();

  // Observable property for the selected plan
  private $plan = new BehaviorSubject<Plan>(new Plan);
  plan = this.$plan.asObservable();

  // Observable property for the array of plan structures
  private $planStructures = new BehaviorSubject<PlanStructure[]>([]);
  planStructures = this.$planStructures.asObservable();

  // Observable property for the selected workpack model
  private $planStructure = new BehaviorSubject<PlanStructure>(new PlanStructure);
  planStructure = this.$planStructure.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService) {
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http to query a Plan by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: none
  //
  QueryPlanById(id: String): Observable<Plan> {
    const pathURL = environment.PlanAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
//    this.spinnerService.ShowSpinner();
    return this.http.get(URL)
    .pipe(
      map<any, Plan>(
        (res,err) => {
          this.$plan.next(res as Plan);
          this.spinnerService.HideSpinner();
          return res as Plan;
        }
      ),
      catchError(
        (err) => {
          console.log(err);
          return new Observable<Plan>();
        }
      )
    );
  }

  errorHandler(e): Observable<any> {
    return Observable.throw(e || 'Internal Server error');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http ro request a Plan by id
  //
  // Parameters: 
  //    id: The id of the Schmea to be retrieved
  //
  // Return: An observable to the plan
  //
  GetPlanById(id: String): Observable<Plan> {
    const pathURL = environment.PlanAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return null;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any, Plan>(res => {
        this.spinnerService.HideSpinner();
        return res;
      }));
    }
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save a Plan
  //
  // Parameters: 
  //    plan: The Plan object to save
  //
  // Return: error if something went wrong
  //
  SavePlan(plan: Plan, parentOffice: Office): Observable<Plan> {
    const pathURL = environment.PlanAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + parentOffice;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(plan), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Plan>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Plan
  //
  // Parameters: 
  //    plan: The Plan object to update
  //
  // Return: error if something went wrong
  //
  UpdatePlan(plan: Plan): Observable<Plan> {
    const pathURL = environment.PlanAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + plan.id;
    
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(plan), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Plan>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Plan
  //
  // Parameters: 
  //    id: The id of the Plan to delete
  //
  // Return: error if something went wrong
  //
  DeletePlan(id: String): Observable<any> {
    const pathURL = environment.PlanAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request to query a Plan Structure by id
  //
  // Parameters: 
  //    id: The id of the Plan Structure to retrieve
  //
  // Return: none
  //
  QueryPlanStructureById(id: String): Observable<PlanStructure> {
    const pathURL = environment.planStructureAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http
      .get(URL)
      .pipe(map<any,PlanStructure>(res => {
        this.$planStructure.next(res as PlanStructure);
        this.spinnerService.HideSpinner();
        return res as PlanStructure;
      }));
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Plan Structure
  //
  // Parameters: 
  //    plan: The Plan Structure object to update
  //
  // Return: error if something went wrong
  //
  UpdatePlanStructure(planStructure: PlanStructure): Observable<PlanStructure> {
    const pathURL = environment.planStructureAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + planStructure.id;

    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(planStructure), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, PlanStructure>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }



  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete a Plan Structure
  //
  // Parameters: 
  //    id: The id of the Plan Structure to delete
  //
  // Return: error if something went wrong
  //
  DeletePlanStructure(id: String): Observable<any> {
    const pathURL = environment.planStructureAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http ro request a Plan Structure by id
  //
  // Parameters: 
  //    id: The id of the Plan Structure to be retrieved
  //
  // Return: An observable to the plan structure
  //
  GetPlanStructureById(id: String): Observable<PlanStructure> {
    const pathURL = environment.planStructureAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.get(URL).pipe(map<any, PlanStructure>(res => {
      this.spinnerService.HideSpinner();
      return res;
    }));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Plan Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanPlan() {
    this.$plan.next(new Plan);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Plan Structure Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanPlanStructure() {
    this.$planStructure.next(new PlanStructure);
  }

}
