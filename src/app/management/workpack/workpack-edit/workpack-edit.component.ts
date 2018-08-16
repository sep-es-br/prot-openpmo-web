import { Component, OnInit } from '@angular/core';
import { Workpack } from '../Workpack';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workpack-edit',
  templateUrl: './workpack-edit.component.html',
  styleUrls: ['./workpack-edit.component.css']
})
export class WorkpackEditComponent implements OnInit {

  workpack: Workpack;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.workpack = this.route.snapshot.data['schema'];
  }

}
