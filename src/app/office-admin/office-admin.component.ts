import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { Useful } from '../useful';

@Component({
  selector: 'app-office-admin',
  templateUrl: './office-admin.component.html',
  styleUrls: ['./office-admin.component.css']
})
export class OfficeAdminComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router ) { }

  subscriptions: Subscription[] = [];
  office: Office;
  officeId: String;
  action: String;


  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.dataService.QueryOfficeById(this.officeId);
    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
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
        () => {
          this.router.navigate(['./']); 
        }
      )
    );
  }

  DeleteSchemaTemplate(id: string) {
    this.dataService.GetSchemaTemplateById(id).subscribe(schemaTemplate2delete => {
      if (schemaTemplate2delete.workpackTemplates.length > 0) {
        alert("Sorry, you can not delete this schema because it is not empty.")
      }
      else if(confirm("Are you sure to delete " + schemaTemplate2delete.name + "?")) {
        this.dataService.DeleteSchemaTemplate(id).subscribe(
          () => {
            this.dataService.QueryOfficeById(this.office.id);
            this.router.navigate (['./officeadmin/' + this.action + '/' + this.office.id]);
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
