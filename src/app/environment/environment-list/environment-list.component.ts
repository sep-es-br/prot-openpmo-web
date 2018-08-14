import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
  
})
export class EnvironmentListComponent implements OnInit {

  private baseURL = "http://localhost:4200/api";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  private pathURL = "/environments";  

  environments = [];

  constructor(private http: HttpClient) {
    let URL = this.baseURL + this.pathURL;
    this.http
    .get<any>(URL)
    .subscribe(
      data => {
        this.environments = data;
      },
      err => console.log('myerror: ', err)
    );
  }

  private items = [];

  ngOnInit() {
    // setTimeout( () => {
    //   this.environments = this.dataService.environmentsData;
    // },500);

  }

}
