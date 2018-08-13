import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
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
  private subs: any[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.subs.push(this.route.params.subscribe(params => {
      this.containerId = +params['containerid']; // (+) converts string 'id' to a number
      dataService.QuerySchemas(this.containerId);
        // In a real app: dispatch action to load the details here.
    }));
  }

  private items: MenuItem[];

  ngOnInit() {
    setTimeout( () => {
      this.schemas = this.dataService.schemasData;
    },100);

    this.items = [
      {label:'Categories'},
      {label:'Sports'},
      {label:'Football'},
      {label:'Countries'},
      {label:'Spain'},
      {label:'F.C. Barcelona'},
      {label:'Squad'},
      {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
    ];

  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
