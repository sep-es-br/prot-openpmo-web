import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './security/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from './components/login/login.component'
import { LocaleService } from './services/locale/locale-service.service';
import { DateAdapter } from '@angular/material/core';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang: string = "English";
  languages_list: [] = [];
  key_locale: object;
  icon_flag_locale: object;
  valor: string = "";

  //localeTrigger: Object = new Object();

  jwt: any;
  jwtPayload: any;
  loadLogin: Boolean = false;

  subscriptions: Subscription[] = [];

  constructor ( private translate: TranslateService, 
                private localeService: LocaleService, 
                private authService: AuthService,
                private adapter: DateAdapter<any>,
                private httpClient : HttpClient,
                private route: ActivatedRoute,
                private cookie: CookieService, ) {
    translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.jwtPayload = this.authService.GetTokenPayload();
    this.authService.jwtPayload.subscribe(pl => {
      this.jwtPayload = pl;
    });

    this.httpClient.get('../assets/i18n/config.json').subscribe (config => {
      this.languages_list = config['languages'];
      this.key_locale = config['key_locale'];
      this.icon_flag_locale = config['icon_flag_locale'];

      if ( this.cookie.check( 'locale' ) ) {
        this.switchLanguage( this.cookie.get( 'locale' ) )
      }
      else {this.switchLanguage( this.lang )}
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
  //    Other translations, use observable object:  localeConfig.<id found in src/assets/i18n/en.json>
  //
  switchLanguage( language : string ) {
    this.lang = language; //Variable visible to the user by the template
    this.translate.use( this.key_locale[ language ] ); //ngx library
    this.localeService.SetLocaleConfig( this.key_locale[ language ] ); //Defining locale for translation service
    this.adapter.setLocale( this.key_locale[ language ] ); //Local setting for date mask

    //Cookie update
    this.cookie.delete('locale');
    this.cookie.set('locale', language, 365);
  };


  IsNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;  
  }

  ////////////////////////////////////////////////////////////////////////
  // STRING FILTERING
  // 
  // Input parameters:
  //    caracters:string  - string formed by valid characters
  //    value             - value entered by the user
  //
  // Return: valid characters entered
  stringFilter( value:string = "", caracters:string = "" ) {

    let i: number = 0;
    let j: number = 0;
    let data_suport: any = "";
    let char_value: any = value.split("");
    let char_caracters: any = caracters.split("");

    for ( i=0; i < value.length; i++ ) {
      for ( j=0; j < caracters.length; j++) {

        if( char_value[i] == char_caracters[j] ) {
          data_suport = data_suport + char_value[i];
          j = caracters.length;
        }
      }
    }
    
    return data_suport;
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

 

