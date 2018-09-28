import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { MatSpinner } from '@angular/material';
import { DataService } from './data.service';
import { startWith, map, tap } from 'rxjs/operators';
import { delay } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'openpmo-web';
  spinnerOn: Boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, 
              private dataService: DataService){}

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


