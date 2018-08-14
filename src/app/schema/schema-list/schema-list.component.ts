import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.css']
})
export class SchemaListComponent implements OnInit, OnDestroy {

  schemas = [];
  private containerId: any;
  private subs: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.subs.push(this.route.params.subscribe(params => {
      this.containerId = +params['containerid'];
      dataService.QueryEnvironmentById(this.containerId);
    }));
  }

  private items = [];

  ngOnInit() {
    setTimeout( () => {
      this.schemas = this.dataService.environmentData.schemas;
    },500);

  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
