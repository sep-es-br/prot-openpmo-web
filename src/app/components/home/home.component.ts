import { Component, OnInit } from '@angular/core';
import { Office } from '../../model/office';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OfficeDataService } from '../../services/data/office/office-data.service';
import { BreadcrumbService, Breadcrumb } from '../../services/breadcrumb/breadcrumb.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    // {text: 'Three', cols: 4, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 1, color: '#DDBDF1'},
  ];

  offices: Office[] = [];
  private subscriptions: Subscription[] = [];
  private breadcrumbTrail: Breadcrumb[] = [];

  localeConfig: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeDataService: OfficeDataService,
    private breadcrumbService: BreadcrumbService,
    private localeDialog: AppComponent,
    public dialog: MatDialog,
    private localeService: LocaleService, ) {
  }

  private items = [];

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Prepare data before loading screen
  ngOnInit() {

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 

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

  //Update path traveled by the user
  UpdateBreadcrumb() {
    let index = this.breadcrumbTrail.findIndex(crumb => crumb.id == '');
    if (index == -1) {
      this.breadcrumbService.Add(new Breadcrumb);
    }
    else {
      this.breadcrumbService.GoTo(index);
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Offices
  //
  //Identification Parameter: id
  //
  deleteOffice(id: string) {

    let officeToDelete = this.offices.find(o => o.id === id);
    if (officeToDelete.plans.length > 0) {
      this.dialog.open(MessageDialogComponent, { 
        data: {
          title: this.localeConfig['Warning'],
          message: this.localeConfig['Sorry, you can not delete an office containing nested plans.'], 
          action: "OK"
        }
      });      
    } else if (officeToDelete.planStructures.length > 0) {
      this.dialog.open(MessageDialogComponent, { 
        data: {
          title: this.localeConfig['Warning'],
          message: this.localeConfig['Sorry, you can not delete an office containing assigned plan structures.'],
          action: "OK"
        }
      });      
    } 
    else {
      this.subscriptions.push(
        this.dialog.open(MessageDialogComponent, { 
          data: {
            title: this.localeConfig['Attention'],
            message: this.localeConfig['Are you sure to delete'] + officeToDelete.name + "?",
            action: 'YES_NO'
          }
        })
        .afterClosed()
        .subscribe(res => {
          if (res == "YES") {
            this.subscriptions.push(
              this.officeDataService.DeleteOffice(id).subscribe(
                () => this.officeDataService.QueryOffices()
              )
            );
          }
        })
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  // END OF PAGE
  // Suspension of signatures when closing the page
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
