import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../model/office';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Useful } from '../useful';
import { BreadcrumbService, Breadcrumb } from '../breadcrumb.service';

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

  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;
  breadcrumbTrail: Breadcrumb[] = [];

  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
        this.breadcrumbService.SetCurrentOffice(o);
      })
    );
    this.subscriptions.push(
      this.breadcrumbService.breadcrumbTrail.subscribe(trail => {
        this.breadcrumbTrail = trail;
      })
    );
  }

  SetTrimmedNameAndShortName(value: String){
    this.office.name = this.useful.GetTrimmedName(value);
    this.office.shortName = this.useful.GetShortName(this.office.name);
  }

  onSubmit(){
    this.office.name = this.office.name.trim();
    this.office.shortName = this.useful.GetShortName(this.office.shortName);

    this.subscriptions.push(
      this.dataService
      .SaveOffice(this.office)
      .subscribe(
        ret => {
          this.router.navigate(['./']);
        },
        error => Observable.throw(error),
        () => {
          this.router.navigate(['./']); 
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
