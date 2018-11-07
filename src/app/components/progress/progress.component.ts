import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, OnDestroy {
  spinnerOn: Boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService) { }
  
  ngOnInit() {
    this.subscriptions.push(
      this.spinnerService.spinnerOn
        .subscribe(sp => {
          this.spinnerOn = sp;
        })
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
