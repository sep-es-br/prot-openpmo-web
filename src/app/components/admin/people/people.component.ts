import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { Subscription } from 'rxjs';
import { PersonDataService } from 'src/app/services/data/person/person-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { BreadcrumbService, Breadcrumb } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  localeConfig: any;
  
  constructor(
    private personDataService: PersonDataService, 
    public dialog: MatDialog,
    private breadCrumbService: BreadcrumbService,
    private localeService: LocaleService) { }

  people: Person[] = [];
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
      this.personDataService.people.subscribe(p => {
        this.people = p;
        this.breadCrumbService.UpdateBreadcrumb({ name: "People administration" }, 'person');
      })
    );
    
    
    
    this.personDataService.QueryPeople();

    console.log('people', this.people);
  }


  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Person
  //
  //Identification Parameter: id
  //
  RemovePerson(id: string) {
    this.subscriptions.push(
      this.personDataService.GetPersonById(id).subscribe(person2delete => {
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig['Attention'],
              message: this.localeConfig['Are you sure to remove'] + ' ' + person2delete.name + "?",
              action: 'YES_NO'
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.personDataService.RemovePerson(id).subscribe(
                  () => {
                    this.personDataService.QueryPeople();
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
