import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../model/office';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Useful } from '../useful';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private breadcrumbService: BreadcrumbService,
    private useful: Useful,
    private router: Router) { }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  
  shortNameFormControl = new FormControl('', [
    Validators.required
  ]);
  

  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];
  propertiesPanelOpenState: Boolean = false;
  schemasPanelOpenState: Boolean = true;

  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == 'new') {
      this.propertiesPanelOpenState = true;
      this.schemasPanelOpenState = false;
    } 
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  onSubmit(){
    this.office.name = this.office.name.trim();
    this.office.shortName = this.office.shortName.trim();

    this.subscriptions.push(
      this.dataService
      .SaveOffice(this.office)
      .subscribe(
        () => {
          this.router.navigate (['./']);
        }
      )
    );
  }

  DeleteSchema(id: string) {
    this.dataService.GetSchemaById(id).subscribe(schema2delete => {
      if (schema2delete.workpacks.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schema2delete.name + "?")) {
        this.dataService.DeleteSchema(id).subscribe(
          () => {
            this.dataService.QueryOfficeById(this.office.id);
            this.router.navigate (['./office/' + this.action + '/' + this.office.id]);
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
