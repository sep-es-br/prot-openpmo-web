import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from '../Office';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})


export class OfficeEditComponent implements OnInit {

  office: Office;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.route.snapshot.data['office'] !== undefined) {
      this.office = this.route.snapshot.data['office'];
    }
    else {
      this.office = new Office;
    }
  }

  SetTrimmedOfficeNameAndShortName(value: String){
    if (value.trim() == ""){
      this.office.name = value = "";
    }
    else {
      this.office.name = value;
    }
    this.office.shortName = this.office.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/ig, "_");
  }

  onSubmit(){
    this.office.name = this.office.name.trim();
    this.office.shortName = this.office.shortName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/ig, "_");

    this.dataService
      .SaveOffice(this.office)
      .subscribe(
        ret => {
          this.router.navigate(['./']);
        },
        error => Observable.throw(error),
        () => {
          this.router.navigate(['./']); //ANYHOW WILL CALL
        }
      );
  }

}
