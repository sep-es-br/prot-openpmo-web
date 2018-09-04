import { Component, OnInit } from '@angular/core';
import { Office } from '../model/office';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  offices: Office[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService ) {
  }

  private items = [];

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.offices.subscribe(o => {
        this.offices = o;
        console.log('this.offices', this.offices);
      })
    );
    this.dataService.QueryOffices();
  }

  deleteOffice(id: string) {

    let officeToDelete = this.offices.find(o => o.id === id);
    if (officeToDelete.schemas.length > 0) {
      alert('Sorry, you can not delete this office because it is has schemas.')
    } else if (officeToDelete.schemaTemplates.length > 0) {
      alert('Sorry, you can not delete this office because it is has schema templates.')
    } else if(confirm('Are you sure to delete the office ' + officeToDelete.name + '?')) {
      this.dataService.DeleteOffice(id).subscribe(
        () => {
          this.dataService.QueryOffices();
          this.router.navigate (['./']);
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
