import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workpack } from '../Workpack';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Schema } from '../../schema/Schema';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-workpack-list',
  templateUrl: './workpack-list.component.html',
  styleUrls: ['./workpack-list.component.css']
})
export class WorkpackListComponent implements OnInit, OnDestroy {

  parentName: String = "";
  schema: Schema;
  parent: any;
  workpacks: Workpack[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.parent = this.route.snapshot.data['workpack'] || this.route.snapshot.data['schema'];
    this.dataService.GetWorkpacks(this.parent.id);
    this.subscriptions.push(
      this.dataService.workpacks.subscribe(w => {
        this.workpacks = w;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
