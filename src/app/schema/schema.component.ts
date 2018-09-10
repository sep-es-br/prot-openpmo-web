import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Schema } from '../model/schema';
import { Office } from '../model/office';
import { Useful } from '../useful';
import { Breadcrumb, BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router,
    private crumbService: BreadcrumbService ) {}

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schema: Schema = new Schema();
  schemaId: String;
  action: String;
  title: String;
  showForm: Boolean;
  showChildren: Boolean;
  breadcrumbTrail: Breadcrumb[];

  ngOnInit() {
    this.SetPanels(this.route.snapshot.paramMap.get('action'));
    this.schemaId = this.route.snapshot.paramMap.get('id');

    this.title = 'Edit Schema';
    this.subscriptions.push(
      this.dataService.schema.subscribe(s =>{
        this.schema = s;
        this.crumbService.SetCurrentSchema(s);
      })
    );

    this.crumbService.breadcrumbTrail.subscribe(bct => {
      this.breadcrumbTrail = bct;
    });


    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
  }

  SetPanels(action: String) {
    this.action = action;
    this.showForm = (action != 'children');
    this.showChildren = ((action != 'children') || (action != 'detail'))
  }

  SetTrimmedNameAndShortName(value: String){
    this.schema.name = this.useful.GetTrimmedName(value);
    this.schema.shortName = this.useful.GetShortName(this.schema.name);
  }

  onSubmit(){
    this.schema.name = this.schema.name.trim();
    this.schema.shortName = this.useful.GetShortName(this.schema.shortName);

    if (this.action == 'new') {
      this.office.schemas.push(this.schema);
      this.subscriptions.push(
        this.dataService
        .UpdateOffice(this.office)
        .subscribe(
          ret => {
            this.router.navigate(['./office/children/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./office/children/' + this.office.id]); 
          }
        )
      );
    }
    else {
      this.subscriptions.push(
        this.dataService
        .UpdateSchema(this.schema)
        .subscribe(
          ret => {
            this.router.navigate(['./office/children/' + this.office.id]);
          },
          error => Observable.throw(error),
          () => {
            this.router.navigate(['./office/children/' + this.office.id]); 
          }
        )
      );
    }

  }

  deleteWorkpack(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackById(id)
      .subscribe(workpack2delete => {
        if (workpack2delete.components.length > 0) {
          alert("Sorry, you can not delete this workpack because it is not empty.")
        }
        else if(confirm("Are you sure to delete " + workpack2delete.name + "?")) {
          this.dataService.DeleteWorkpack(id).subscribe(
            () => {
              this.router.navigate (['./schema/children/' + this.schema.id]);
            }
          );
        }
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
