import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor() { }

  people: Person[] = [
    {
      id: "1",
      name: "Alan",
      fullName: "Alan Santos",
      userName: "alan.santos"
    },
    {
      id: "2",
      name: "Marcos",
      fullName: "Marcos Santos",
      userName: "marcos.santos"
    },
    {
      id: "3",
      name: "Vagner",
      fullName: "Vagner Cordeiro",
      userName: "vagner.cordeiro"
    }
  ];


  ngOnInit() {

    console.log('people', this.people);
  }

}
