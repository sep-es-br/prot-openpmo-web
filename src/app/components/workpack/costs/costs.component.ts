import { Component, OnInit, Input } from '@angular/core';
import { ViewOptions } from 'src/app/model/view-options';
import { Cost, CostStage } from 'src/app/model/cost';
import { Workpack } from 'src/app/model/workpack';
import { LocaleService } from '../../../services/locale/locale-service.service';
import { Subscription } from 'rxjs';
import { CostDataService } from 'src/app/services/data/cost/cost-data.service';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';
import { WorkpackDataService } from 'src/app/services/data/workpack/workpack-data.service';


@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {


  @Input() viewOptions: ViewOptions;

  @Input() workpack: Workpack;

  subscriptions: Subscription[] = [];
  costStages = CostStage;

  localeConfig: any;

  wpCosts: Cost[] = [];

  constructor(
    private costDataService: CostDataService,
    private localeService: LocaleService,
    private workpackDataService: WorkpackDataService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.wpCosts = this.workpack.costs;

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    );     
  }

  CostStageKeys() : Array<string> {
    var keys = Object.keys(CostStage);
    return keys;
  }

  ////////////////////////////////////////////////////////////////////////
  //EXCLUSION MODULE - Cost
  //
  //Identification Parameter: cost id
  //
  RemoveCost(id: string) {
    this.subscriptions
    .push(
      this.costDataService
      .GetCostById(id)
      .subscribe(cost2delete => {
        const msg = `${this.localeConfig["Are you sure to delete the cost"]} ${cost2delete.name} ` +
                    `${this.localeConfig["of this"]} ${this.workpack.model.name}?`;
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
                this.costDataService.RemoveCost(id).subscribe(
                  () => {
                    this.subscriptions
                    .push(
                      this.costDataService.GetAllCostsByWorkpackId(this.workpack.id)
                      .subscribe(res => {
                        this.wpCosts = res as Cost[];
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
