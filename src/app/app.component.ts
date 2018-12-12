import { Component, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale/locale-service.service';
import { DateAdapter } from '@angular/material/core';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';

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

  constructor ( private translate: TranslateService, 
                private localeService: LocaleService, 
                private adapter: DateAdapter<any>,
                private httpClient : HttpClient ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
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

} 





 

