import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router,  private dataService: DataService) {
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


  deleteSchema(id: string) {
    this.dataService.GetSchemaById(id).subscribe(schema2delete => {
      if (schema2delete.workpacks.length > 0) {
        alert("Sorry, you can not delete this schema because it is contains workpacks.")
      }
      else if(confirm("Are you sure to delete the schema " + schema2delete.name + "?")) {
        this.dataService.DeleteSchema(id).subscribe(
          () => {
            this.router.navigate (['./schemas/' + this.office.id]);
          }
        );
      }
    });
  }



  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
