import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from '../Office';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})

export class OfficeListComponent implements OnInit {

  private offices: Office[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService ) {
  }

  private items = [];

  ngOnInit() {
    this.dataService.GetOffices();
    this.subscriptions.push(
      this.dataService.offices.subscribe(o => {
        this.offices = o;
      })
    );
  }

  deleteOffice(id: string) {
    let officeToDelete = this.offices.find(o => o.id == id);
    console.log('officeToDelete', officeToDelete);
    if (officeToDelete.schemas.length > 0) {
      alert("Sorry, you can not delete this office because it is has schemas.")
    }
    else if (officeToDelete.schemaTemplates.length > 0) {
      alert("Sorry, you can not delete this office because it is has schema templates.")
    }
    else if(confirm("Are you sure to delete the office " + officeToDelete.name + "?")) {
      this.dataService.DeleteOffice(id).subscribe(
        () => {
          this.router.navigate (['./offices/'+id]);
        }
      );
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
