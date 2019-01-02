import { Component, OnInit, Input } from '@angular/core';
import { ViewOptions } from 'src/app/model/view-options';
import { Role, ActorType } from 'src/app/model/role';
import { Workpack } from 'src/app/model/workpack';
import { LocaleService } from '../../../services/locale/locale-service.service';
import { Subscription } from 'rxjs';
import { RoleDataService } from 'src/app/services/data/role/role-data.service';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';
import { WorkpackDataService } from 'src/app/services/data/workpack/workpack-data.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {


  @Input() viewOptions: ViewOptions;

  @Input() workpack: Workpack;

  subscriptions: Subscription[] = [];
  actorTypes = ActorType;
  wpRoles: Role[] = [];

  localeConfig: any;

  constructor(
    private roleDataService: RoleDataService,
    private localeService: LocaleService,
    private workpackDataService: WorkpackDataService,
    private dialog: MatDialog) { }

  ngOnInit() {
    console.log('viewOptions',this.viewOptions);
    console.log('wpRoles',this.wpRoles);
    console.log('workpack',this.workpack);

    
    
    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    );     

    if (this.workpack.id != null) {
      this.roleDataService.QueryAllRolesByScopeId(this.workpack.id);
    }
    this.subscriptions.push(
      this.roleDataService.roles.subscribe(
        roles => {
          this.wpRoles = roles;
        }
      )
    );
  }

  ActorTypeKeys() : Array<string> {
    var keys = Object.keys(ActorType);
    return keys;
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Role
  //
  //Identification Parameter: role id
  //
  RemoveRole(id: string) {
    this.subscriptions
    .push(
      this.roleDataService
      .GetRoleById(id)
      .subscribe(role2delete => {
        const msg = `${this.localeConfig["Are you sure to remove"]} ${role2delete.actor.name} ` +
                    `${this.localeConfig["as stakeholder of this"]} ${this.workpack.model.name}?`;
        this.subscriptions.push(
          this.dialog.open(MessageDialogComponent, { 
            data: {
              title: this.localeConfig["Attention"],
              message:  msg,
              action: "YES_NO"
            }
          })
          .afterClosed()
          .subscribe(res => {
            if (res == "YES") {
              this.subscriptions.push(
                this.roleDataService.RemoveRole(id).subscribe(
                  () => {
                    this.subscriptions
                    .push(
                      this.roleDataService.GetAllRolesByScopeId(this.workpack.id)
                      .subscribe(res => {
                        this.wpRoles = res as Role[];
                      })
                    );
                  }
                )                      
              );
            }
          })
        );
      })
    );
  }



}
