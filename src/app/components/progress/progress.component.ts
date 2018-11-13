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
  
  // TOP OF THE PAGE - Preparing data before loading screen
  ngOnInit() {
    this.subscriptions.push(
      this.spinnerService.spinnerOn
        .subscribe(sp => {
          this.spinnerOn = sp;
        })
    );
  }
  
  // END OF PAGE - Suspension of signatures when closing the page
  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
