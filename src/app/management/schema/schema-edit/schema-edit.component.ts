import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Schema } from '../Schema';
import { DataService } from '../../../data.service';
import { Office } from '../../../office/Office';

@Component({
  selector: 'app-schema-edit',
  templateUrl: './schema-edit.component.html',
  styleUrls: ['./schema-edit.component.css']
})
export class SchemaEditComponent implements OnInit {

  private schema: Schema;
  private parentId: String;
  private parentOffice: Office;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.parentId = this.route.snapshot.paramMap.get('id'); 
    this.dataService.GetOfficeById(this.parentId).subscribe(office => {
      this.parentOffice = office;
    });

    if (this.route.snapshot.data['schema'] !== undefined) {
      this.schema = this.route.snapshot.data['schema'];
    }
    else {
      this.schema = new Schema;
    }
  }

  SetTrimmedSchemaNameAndShortName(value: String){
    if (value.trim() == ""){
      this.schema.name = value = "";
    }
    else {
      this.schema.name = value;
    }
    this.schema.shortName = this.schema.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/ig, "_");
  }

  onSubmit(){
    this.schema.name = this.schema.name.trim();
    this.schema.shortName = this.schema.shortName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/ig, "_");

    this.parentOffice.schemas.push(this.schema);
    this.dataService
      .UpdateOffice(this.parentOffice)
      .subscribe(
        () => {
          this.router.navigate(['./schemas/' + this.parentId]); //ANYHOW WILL CALL
        }
      );
  }

}
