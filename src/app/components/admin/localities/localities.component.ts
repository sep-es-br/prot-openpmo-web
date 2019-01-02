import { Component, OnInit } from '@angular/core';
import { Locality } from 'src/app/model/locality';
import { Subscription } from 'rxjs';
import { LocalityDataService } from 'src/app/services/data/locality/locality-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { BreadcrumbService, Breadcrumb } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

@Component({
  selector: 'app-localities',
  templateUrl: './localities.component.html',
  styleUrls: ['./localities.component.css']
})
export class LocalitiesComponent implements OnInit {

  localeConfig: any;
  
  constructor(
    private localityDataService: LocalityDataService, 
    public dialog: MatDialog,
    private breadCrumbService: BreadcrumbService,
    private localeService: LocaleService) { }

  localities: Locality[] = [];
  private subscriptions: Subscription[] = [];

  ////////////////////////////////////////////////////////////////////////
  // TOP OF THE PAGE
  // Prepare data before loading screen
  
  ngOnInit() {
    this.breadCrumbService.GoTo(0);
    
    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 

    this.subscriptions.push(
      this.localityDataService.localities.subscribe(p => {
        this.localities = p;
        this.breadCrumbService.UpdateBreadcrumb({ name: "Localities administration" }, 'locality');
      })
    );
    
    
    
    this.localityDataService.QueryLocalities();

  }


  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Locality
  //
  //Identification Parameter: id
  //
  DeleteLocality(id: string) {
    this.subscriptions.push(
      this.localityDataService.GetLocalityById(id).subscribe(locality2delete => {
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig['Attention'],
              message: this.localeConfig['Are you sure to delete'] + locality2delete.name + "?",
              action: this.localeConfig['YES_NO']
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.localityDataService.DeleteLocality(id).subscribe(
                  () => {
                    this.localityDataService.QueryLocalities();
                  }
                )                      
              );
            }
          })
        );
      })
    );
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
