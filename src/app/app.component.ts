import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner/spinner.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'openpmo-web';
  spinnerOn: Boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private translate: TranslateService){
    translate.setDefaultLang('en');
  }

  lang:string = "En";

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

  switchLanguage(language: string) {
    this.translate.use(language);

    if (language == "en")
      this.lang = "En";
    if (language == "pt-BR")
      this.lang = "Pt-BR"; 
  }
}

 

