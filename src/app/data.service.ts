import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

/* Object type to receive the response from the http request */
export interface HttpReply { } 

@Injectable({
  providedIn: 'root'
})

export class DataService {

  environmentsData: any;
  
  // // Observable property for the full list of environments  
  // private $environments = new BehaviorSubject<any[]>([]);
  // environments = this.$environments.asObservable();

  // Observable property for the full list of workpackTemplates  
  private $workpackTemplates = new BehaviorSubject<any[]>([]);
  workpackTemplates = this.$workpackTemplates.asObservable();

  private baseURL = "http://localhost:4200";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  
  private basePathURL = "/api";

  constructor(private http: HttpClient) {
  }
  
  
  ////////////////////////////////////////////////////////////////////////
  //
  // Run the GET http request for the list of Environments
  //
  // Query all environments from database
  QueryEnvironments() {
    const pathURL = "/environments";
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.environmentsData = data,
      err => console.log('myerror: ', err)
    );
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  // GET ALL WORKPACK TEMPLATES
  //
  // Query all workpack templates from database
  GetWorkpackTemplates() {
    const pathURL = "/workpacktemplates";
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.$workpackTemplates = data,
      err => console.log('myerror: ', err)
    );
  }
}
