import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './security/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from './components/login/login.component'
import { LocaleService } from './services/locale/locale-service.service';
import { DateAdapter } from '@angular/material/core';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { LogoutService } from './security/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang: string = "English";
  languages_list:[] = [];
  key_locale: object;

  //localeTrigger: Object = new Object();

  jwt: any;
  jwtPayload: any;

  loadLogin: Boolean = false;

  subscriptions: Subscription[] = [];

  constructor ( private translate: TranslateService, 
                private localeService: LocaleService, 
                private authService: AuthService,
                private logout: LogoutService,
                private adapter: DateAdapter<any>,
                private httpClient : HttpClient,
                private route: ActivatedRoute ) {
    translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.jwtPayload = this.authService.GetTokenPayload();
    this.authService.jwtPayload.subscribe(pl => {
      this.jwtPayload = pl;
    });
    this.adapter.setLocale('en');
    this.localeService.SetLocaleConfig('en');

    this.httpClient.get('../assets/i18n/config.json').subscribe (config => {
      this.languages_list = config['languages'];
      this.key_locale = config['id_locale'];
    });
  }

  ////////////////////////////////////////////////////////////////////////
  // TRANSLATE MODULE - LIBRARY:
  //
  // Parameters:
  //    language             receives language parameter: (English, Portuguese BR, ...)
  //  
  // Variables: 
  //    lang:                modifies interface in app.component.html - standard:'English'
  //    key_locale:          save the location keys: (en, pt-BR, ...)
  //
  // Data source:            src/assets/i18n
  //
  // Use to translate:
  //    Variables or arrays:                        {{ <variable> | translate:use }}
  //    Text html or ngFor:                         Example: <span translate> text </span>
  //    Other translations, use observable object:  localeConfig.<id found in src/assets/i18n/source.json>
  //
  switchLanguage( language : string ) {
    this.lang = language; //Variable visible to the user by the template
    this.translate.use( this.key_locale[ language ]); //ngx library
    this.localeService.SetLocaleConfig( this.key_locale[ language ]); //Defining locale for translation service
    this.adapter.setLocale( this.key_locale[ language ]); //Local setting for date mask
  };


  IsNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;  
  }

  Logout(){
    this.logout.logout();
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

 

