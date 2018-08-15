import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workpack } from '../Workpack';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { Schema } from '../../schema/Schema';

@Component({
  selector: 'app-workpack-list',
  templateUrl: './workpack-list.component.html',
  styleUrls: ['./workpack-list.component.css']
})
export class WorkpackListComponent implements OnInit, OnDestroy {

  parentName: String = "";
  schema: Schema;
  parentWorkpack: Workpack;
  workpacks: Workpack[] = [];
  navigationSubscription: Subscription;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.InitializeWorkpacks();
      }
    });
  }

  ngOnInit() {
  }

  InitializeWorkpacks() {
    this.workpacks = this.route.snapshot.data['workpacks'];
    this.schema = this.route.snapshot.data['schema'];
    this.parentWorkpack = this.route.snapshot.data['workpack'];
    console.log('this.schema', this.schema);
    console.log('this.parentWorkpack',this.parentWorkpack);
    if (this.schema !== undefined) {
      this.parentName = this.schema.name;
    }
    else if (this.parentWorkpack !== undefined){
      this.parentName = this.parentWorkpack.name;
    }
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
}
