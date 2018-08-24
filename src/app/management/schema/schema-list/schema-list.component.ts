import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '../Schema';
import { Office } from '../../../office/Office';
import { DataService } from '../../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.css']
})
export class SchemaListComponent implements OnInit {

  schemas: Schema[] = [];
  office: Office;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.office = this.route.snapshot.data['office'];
    this.dataService.GetSchemas(this.office.id);
    this.subscriptions.push(
      this.dataService.schemas.subscribe(s => {
        this.schemas = s;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
