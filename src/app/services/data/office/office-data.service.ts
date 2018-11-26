import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office } from '../../../model/office';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../spinner/spinner.service';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class OfficeDataService {
 
  // Observable property for the array of offices
  private $offices = new BehaviorSubject<Office[]>([]);
  offices = this.$offices.asObservable();

  // Observable property for the selected office
  private $office = new BehaviorSubject<Office>(new Office);
  office = this.$office.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;

  constructor(private http: HttpClient, 
              private spinnerService: SpinnerService,
              public dialog: MatDialog) {
  }

  ///////////////////////////////////////////////////////////////////////
  //
  // Show an error message in a modal dialog box
  // 
  // Return: none
  // 
  ShowErrorMessagee(error){
    this.dialog.open(MessageDialogComponent, { 
      data: {
        title: error.statusText,
        message: error.message,
        action: "OK"
      }
    });    
  }


  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request for the list of Offices
  // 
  // Return: none
  // 
  QueryOffices(){
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$offices.next(res as Office[]);
        this.spinnerService.HideSpinner();
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query an Office by its id
  //
  // Parameters: 
  //    id: The id of the Office to retrieve
  //
  // Return: none
  //
  QueryOfficeById(id: String): Observable<Office> {
    const pathURL = environment.officeAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<any, Office>(
              (res) => {
                this.$office.next(res as Office);
                this.spinnerService.HideSpinner();
                return res as Office;
              },
              (error) => {
                this.spinnerService.HideSpinner();
                this.ShowErrorMessagee(error);
              }
            ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query an Office by its id
  //
  // Parameters: 
  //    id: The id of the Office to retrieve
  //
  // Return: Observable to the office found
  //
  GetOfficeById(id: String) {
    const pathURL = environment.officeAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.office;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<any,Office>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res;
        },
        (error) => {
          this.spinnerService.HideSpinner();
          this.ShowErrorMessagee(error);
        }
      ));
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save an Office
  //
  // Parameters: 
  //    office: The Office object to save
  //
  // Return: error if something went wrong
  //
  SaveOffice(office: Office): Observable<Office> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(office), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Office>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update an Office
  //
  // Parameters: 
  //    office: The Office object to update
  //
  // Return: error if something went wrong
  //
  UpdateOffice(office: Office): Observable<Office> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + office.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(office), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<any, Office>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to delete an Office
  //
  // Parameters: 
  //    id: The id of the Office to delete
  //
  // Return: error if something went wrong
  //
  DeleteOffice(id: String): Observable<any> {
    const pathURL = environment.officeAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<any, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      },
      (error) => {
        this.spinnerService.HideSpinner();
        this.ShowErrorMessagee(error);
      }
    ));
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Office Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanOffice() {
    this.$office.next(new Office);
  }

}
