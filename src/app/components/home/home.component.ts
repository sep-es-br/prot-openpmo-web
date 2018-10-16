import { Component, OnInit } from '@angular/core';
import { Office } from '../../model/office';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  offices: Office[] = [];
  private subscriptions: Subscription[] = [];
  private breadcrumbTrail: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private breadcrumbService: BreadcrumbService ) {
  }

  private items = [];

  ngOnInit() {
    this.subscriptions.push(
      this.officeDataService.offices.subscribe(o => {
        this.offices = o;
        this.UpdateBreadcrumb();
      })
    );
    this.officeDataService.QueryOffices();
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
    
  }

  UpdateBreadcrumb() {
    let index = this.breadcrumbTrail.findIndex(crumb => crumb.id == '');
    if (index == -1) {
      this.breadcrumbService.Add(new Breadcrumb);
    }
    else {
      this.breadcrumbService.GoTo(index);
    }
  }

  deleteOffice(id: string) {

    let officeToDelete = this.offices.find(o => o.id === id);
    if (officeToDelete.schemas.length > 0) {
      alert('Sorry, you can not delete this office because it is has schemas.')
    } else if (officeToDelete.schemaTemplates.length > 0) {
      alert('Sorry, you can not delete this office because it is has schema templates.')
    } else if(confirm('Are you sure to delete the office ' + officeToDelete.name + '?')) {
      this.officeDataService.DeleteOffice(id).subscribe(
        () => {
          this.officeDataService.QueryOffices();
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
