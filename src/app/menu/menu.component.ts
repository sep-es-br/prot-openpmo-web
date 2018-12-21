import { Component, OnInit } from '@angular/core';
import { LocaleService } from '../services/locale/locale-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  localeConfig: Object = new Object();

  constructor(private localeService: LocaleService ) { }

  subscriptions: Subscription[] = [];

  ngOnInit() {

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
