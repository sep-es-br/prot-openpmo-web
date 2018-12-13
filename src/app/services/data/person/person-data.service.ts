import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner/spinner.service';
import { MatDialog } from '@angular/material';
import { Person } from 'src/app/model/person';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { map, catchError } from 'rxjs/operators';
import { AuthClientHttp } from 'src/app/security/auth-client-http';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  constructor(private http: AuthClientHttp, 
              private spinnerService: SpinnerService,
              public dialog: MatDialog) {
  }  

  // Observable property for the array of offices
  private $people = new BehaviorSubject<Person[]>([]);
  people = this.$people.asObservable();

  // Observable property for the selected office
  private $person = new BehaviorSubject<Person>(new Person);
  person = this.$person.asObservable();

  private baseURL = environment.databaseHost;
  
  private basePathURL = environment.baseAPIPath;



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
  // Run a GET http request for the list of People
  // 
  // Return: none
  // 
  QueryPeople(){
    const pathURL = environment.personAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$people.next(res as Person[]);
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
  // Run a GET http request for the list of People that has a given string
  // in the name or full name
  // 
  // Parameter: 
  //    name: string containing a scrap of the name being searched 
  //
  // Return: none
  // 
  QueryPeoplByName(nameScrap: string){
    const pathURL = environment.personAPI + environment.personLikeResource;
    const URL = this.baseURL + this.basePathURL + pathURL + nameScrap;
    this.spinnerService.ShowSpinner();
    this.http.get(URL).subscribe(
      (res) => {
        this.$people.next(res as Person[]);
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
  // Run a GET http request to query a Person by its id
  //
  // Parameters: 
  //    id: The id of the person to retrieve
  //
  // Return: none
  //
  QueryPersonById(id: String): Observable<Person> {
    const pathURL = environment.personAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this
            .http
            .get(URL)
            .pipe(map<Person, any>(
              (res) => {
                this.$person.next(res as Person);
                this.spinnerService.HideSpinner();
                return res as Person;
              }),
              catchError(
                (err) => {
                  this.spinnerService.HideSpinner();
                  this.ShowErrorMessagee(err);
                  return err;
                }
              )
            );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a GET http request to query a Person by its id
  //
  // Parameters: 
  //    id: The id of the Person to retrieve
  //
  // Return: Observable to the person found
  //
  GetPersonById(id: String): Observable<Person> {
    const pathURL = environment.personAPI + id;
    const URL = this.baseURL + this.basePathURL + pathURL;
    if (id == '') {
      return this.person;
    }
    else {
      this.spinnerService.ShowSpinner();
      return this.http.get(URL).pipe(map<Person, any>(
        (res) => {
          this.spinnerService.HideSpinner();
          return res;
        }),
        catchError(
          (err) => {
            this.spinnerService.HideSpinner();
            this.ShowErrorMessagee(err);
            return err;
          }
        )
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a POST http save a new Person
  //
  // Parameters: 
  //    person: The person object to save
  //
  // Return: error if something went wrong
  //
  SavePerson(person: Person): Observable<Person> {
    const pathURL = environment.personAPI;
    const URL = this.baseURL + this.basePathURL + pathURL;
    this.spinnerService.ShowSpinner();
    return this.http.post(
      URL, 
      JSON.stringify(person), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Person,any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$person.next(res);
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.ShowErrorMessagee(err);
          return err;
        }
      )
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a PUT http to update a Person
  //
  // Parameters: 
  //    person: The Person object to update
  //
  // Return: error if something went wrong
  //
  UpdatePerson(person: Person): Observable<Person> {
    const pathURL = environment.personAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + person.id;
    this.spinnerService.ShowSpinner();
    return this.http.put(
      URL, 
      JSON.stringify(person), 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(map<Person, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        this.$person.next(res);
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.ShowErrorMessagee(err);
          return err;
        }
      )
    );
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Run a DELETE http to remove a person from the records
  //
  // Parameters: 
  //    id: The id of the person to remove
  //
  // Return: error if something went wrong
  //
  RemovePerson(id: String): Observable<Person> {
    const pathURL = environment.personAPI;
    const URL = this.baseURL + this.basePathURL + pathURL + id;
    this.spinnerService.ShowSpinner();
    return this.http.delete(URL).pipe(map<Person, any>(
      (res) => {
        this.spinnerService.HideSpinner();
        return res;
      }),
      catchError(
        (err) => {
          this.spinnerService.HideSpinner();
          this.ShowErrorMessagee(err);
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
  CleanPerson() {
    this.$person.next(new Person);
  }  
}
