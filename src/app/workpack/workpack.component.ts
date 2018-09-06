import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { Office } from '../model/office';
import { Schema } from '../model/schema';
import { Workpack } from '../model/workpack';
import { Useful } from '../useful';
import { Panel } from '../model/panel';

@Component({
  selector: 'app-workpack',
  templateUrl: './workpack.component.html',
  styleUrls: ['./workpack.component.css']
})
export class WorkpackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private useful: Useful,
    private router: Router) {
    }

  subscriptions: Subscription[] = [];
  office: Office = new Office();
  schema: Schema = new Schema();
  workpack: Workpack;
  workpath: Workpack[] = [];
  action: String;
  id: String;
  panel: Panel;


  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
    this.id = this.route.snapshot.paramMap.get('id');

    this.subscriptions
    .push(
      this.dataService.panel.subscribe(p => {
        this.panel = p;
      })
    );

    this.subscriptions.push(
      this.dataService.workpack.subscribe(wp =>{
        this.workpack = wp;
      })
    );

    this.subscriptions.push(
      this.dataService.schema.subscribe(s => {
        this.schema = s;
      })
    );

    this.subscriptions.push(
      this.dataService.office.subscribe(o =>{
        this.office = o;
      })
    );
    
    this.subscriptions.push(
      this.dataService.workpath.subscribe(wpath =>{
        this.workpath = wpath;
      })
    );
  }

  SetTrimmedNameAndShortName(value: String){
    this.workpack.name = this.useful.GetTrimmedName(value);
    this.workpack.shortName = this.useful.GetShortName(this.workpack.name);
  }
  
  NewWorkpack() {
    this.action = 'new2workpack';
    this.workpack = new Workpack();
  }

  onSubmit(){
    this.workpack.name = this.workpack.name.trim();
    this.workpack.shortName = this.useful.GetShortName(this.workpack.shortName);
    
    switch (this.action) {
      case 'new2schema': {
        this.schema.workpacks.push(this.workpack);
        this.subscriptions.push(
          this.dataService
          .UpdateSchema(this.schema)
          .subscribe(
            () => {
              this.action = 'children';
              this.router.navigate(['./schema/'+ this.action + '/' + this.schema.id]);
            }
          )
        );
        break;
      }
      case 'new2workpack': {
        let parent = this.workpath[this.workpath.length-1];
        console.log('parent',parent);
        parent.components.push(this.workpack);
        this.subscriptions.push(
          this.dataService
          .UpdateWorkpack(parent)
          .subscribe(
            () => {
              this.action = 'children';
              this.router.navigate(['./workpack/'+ this.action + '/' + parent.id]);
            }
          )
        );
        break;
      }
      case 'edit': {
        let parentId: String;
        let parentRoute: String;

        // if my parent is a schema...
        if (this.workpath.length <= 1) {
          parentId = this.schema.id;
          parentRoute = 'schema';
        }
        else {
          parentId = this.workpath[this.workpath.length-2].id;
          parentRoute = 'workpack';
        }

        this.subscriptions.push(
          this.dataService
          .UpdateWorkpack(this.workpack)
          .subscribe(
            () => {
              this.router.navigate([
                './' + parentRoute + 
                '/children/' + parentId]);
            }
          )
        );
      }
    }
  }

  deleteWorkpack(id: string) {
    this.subscriptions
    .push(
      this.dataService
      .GetWorkpackById(id)
      .subscribe(workpack2delete => {
        if (workpack2delete.components.length > 0) {
          alert("Sorry, you can not delete this workpack because it contains workpacks.")
        }
        else if(confirm("Are you sure you want to delete " + workpack2delete.name + "?")) {
          this.dataService.DeleteWorkpack(id).subscribe(
            () => {
              if (this.workpath.length > 0) {
                this.router.navigate(['./workpack/' + this.action + '/' + this.workpath[this.workpath.length-1].id]);
              }
              else {
                this.router.navigate(['./schema/' + this.action + '/' + this.schema.id]);
              }
            }
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.dataService.CleanWorkpack();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
