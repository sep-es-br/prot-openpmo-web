import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/model/org';
import { Subscription } from 'rxjs';
import { OrgDataService } from 'src/app/services/data/org/org-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

  localeConfig: any;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private orgDataService: OrgDataService,
    private localeService: LocaleService,
    public dialog: MatDialog) { }

  orgs: Org[] = [];
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
      this.orgDataService.orgs.subscribe(p => {
        this.orgs = p;
        this.breadCrumbService.UpdateBreadcrumb({ name: "Organizations administration" }, 'org');
      })
    );    

    this.orgDataService.QueryOrgs();

    console.log('orgs', this.orgs);
  }


  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Org
  //
  //Identification Parameter: id
  //
  RemoveOrg(id: string) {
    this.subscriptions.push(
      this.orgDataService.GetOrgById(id).subscribe(org2delete => {
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig["Attention"],
              message: this.localeConfig["Are you sure to remove"] + org2delete.name + "?",
              action: this.localeConfig["YES_NO"],
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.orgDataService.RemoveOrg(id).subscribe(
                  () => {
                    this.orgDataService.QueryOrgs();
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
