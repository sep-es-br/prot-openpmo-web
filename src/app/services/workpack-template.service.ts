import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


/* Object type to receive the response from the http request */
export interface HttpReply { } /*
  metadata: {
    colName: string;
    colType: number;
    colIndex: number;
  }[];
  queryInfo: {
    totalRows: number
  };
  resultset: string[][];
}

/*

export interface Amendment {
  codigo: String,
  nome: String,
  codigoAutor: String,
  autor: String,
  codigoOrgao: String,
  orgao: String,
  codigoPartido: String,
  partido: String,
  codigoMunicipio: String,
  municipio: String,
  processoEmpenho: String,
  processoReserva: String,
  autorizado: number,
  empenhado: number,
  liquidado: number,
  pago: number,
  phaseAmount: number
}

*/

@Injectable({
  providedIn: 'root'
})
export class WorkpackTemplateService {


  // Observable property for the full list of environments  
  private $environments = new BehaviorSubject<any[]>([]);
  environments = this.$environments.asObservable();

  // Observable property for the full list of workpackTemplates  
  private $workpackTemplates = new BehaviorSubject<any[]>([]);
  workpackTemplates = this.$workpackTemplates.asObservable();

  private baseURL = "http://localhost:8080";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  
  private basePathURL = "/api";
    
  constructor(private http: HttpClient) {
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // GET ALL ENVIRONMENTS
  //
  // Query all environments from database
  GetAllEnvironments() {
    const pathURL = "/environments";
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => {
        this.$environments = data;
        console.log('data',data);
      },
      err => {
        console.log('myerror: ', err);
      }
    );
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // GET ALL WORKPACK TEMPLATES
  //
  // Query all workpack templates from database
  GetAllWorkpackTemplates() {
    const pathURL = "/workpacktemplates";
    let URL = this.baseURL + this.basePathURL + pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => {
        this.$workpackTemplates = data;
      },
      err => {
        console.log('myerror: ', err);
      }
    );
  }
}