import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-environment-edit',
  templateUrl: './environment-edit.component.html',
  styleUrls: ['./environment-edit.component.css']
})
export class EnvironmentEditComponent implements OnInit {

  subs: Subscription[] = [];
  envId: Number;
  environment: any;
  private baseURL = "http://localhost:4200/api";
  //private credentialsURL = (isDevMode())? "&userid=anonimo.bi&password=Da$hb0ard" : "";
  private pathURL = "/environments/";  

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.subs.push(this.route.params.subscribe(params => this.envId = +params['id']));
  }

  ngOnInit() {
    let URL = this.baseURL + this.pathURL + this.envId;
    console.log('URL', URL);
    this.http
    .get<any>(URL)
    .subscribe(
      data => this.environment = data,
      err => console.log('myerror: ', err)
    );
    // setTimeout( () => {
    //   this.environment = this.dataService.environmentData;
    // },1000);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
