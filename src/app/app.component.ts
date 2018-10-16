import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'openpmo-web';
  spinnerOn: Boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService){}

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


