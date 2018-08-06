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


  // Observable property for the full list of workpackTemplates  
  private $workpackTemplates = new BehaviorSubject<any[]>([]);
  workpackTemplates = this.$workpackTemplates.asObservable();


  // Property for the row data 
  private $data: HttpReply;
 
  private baseURL = "http://localhost:8080";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  private basePathURL = "/workpacktemplates";
  //private cookieLongevityDays: number = 3;

  constructor(private http: HttpClient) {

  }

  ////////////////////////////////////////////////////////////////////////
  //
  // GET ALL WORKPACK TEMPLATES
  //
  // Query all workpack templates from database
  WorkpackTemplates() {
    const pathURL = "";
    let URL = this.baseURL + this.basePathURL + pathURL;
    let allWorkpackTemplates: {}[] = [];
    this.http
    .get<any>(URL)
    .subscribe(
      data => {
        this.$data = data;
        console.log('data',data);
      },
      err => {
        console.log('myerror: ', err);
      }
    );
  }
}