import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConstants } from '../app/model/translate';
import { AuthService } from './security/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from './components/login/login.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang : string = "en";

  jwt: any;
  jwtPayload: any;

  loadLogin: Boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private route: ActivatedRoute){
    translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.jwtPayload = this.authService.GetTokenPayload();
    this.authService.jwtPayload.subscribe(pl => {
      this.jwtPayload = pl;
    });
  }

  ////////////////////////////////////////////////////////////////////////
  // TRANSLATE MODULE - LIBRARY:
  //
  // Parameters:
  //    language:     receives language parameter: (en, pt-BR, ...)
  //  
  // Variables: 
  //    lang:         modifies interface in app.component.html - standard:'en'
  //
  // Data source:     src/assets/i18n
  //
  // Use to translate:
  //    Variables or arrays:       {{ <variable> | translate:use }}
  //    Text html or ngFor:        Example: <span translate> text </span>
  //    By the translation model:  {{ translate.<id> | translate:use }}  -  import { TranslateConstants } from 'app/model/translate';
  //
  switchLanguage(language: string) {
    this.translate.use(language);
    this.lang = language;    
  }

  IsNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;  
  }


  ////////////////////////////////////////////////////////////////////////
  // END OF PAGE
  // Suspension of signatures when closing the page
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

 

