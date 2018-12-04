import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/model/org';
import { Subscription } from 'rxjs';
import { OrgDataService } from 'src/app/services/data/org/org-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

  constructor(
    private orgDataService: OrgDataService, 
    public dialog: MatDialog) { }

  orgs: Org[] = [];
  private subscriptions: Subscription[] = [];


  ngOnInit() {
    this.subscriptions.push(
      this.orgDataService.orgs.subscribe(p => {
        this.orgs = p;
        //this.UpdateBreadcrumb();
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
              title: "Attention",
              message: "Are you sure to remove " + org2delete.name + "?",
              action: "YES_NO"
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
