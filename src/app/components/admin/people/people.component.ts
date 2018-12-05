import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { Subscription } from 'rxjs';
import { PersonDataService } from 'src/app/services/data/person/person-data.service';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(
    private personDataService: PersonDataService, 
    public dialog: MatDialog) { }

  people: Person[] = [];
  private subscriptions: Subscription[] = [];


  ngOnInit() {
    this.subscriptions.push(
      this.personDataService.people.subscribe(p => {
        this.people = p;
        //this.UpdateBreadcrumb();
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
              title: "Attention",
              message: "Are you sure to remove " + person2delete.name + "?",
              action: "YES_NO"
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
