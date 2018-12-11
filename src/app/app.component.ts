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
  lang : string = "English";
  languages_list = [];
  id_locale_list: any;

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

    this.httpClient.get('../assets/i18n/config.json').subscribe (pack => {
      this.languages_list = pack['languages'];
      this.id_locale_list = pack['id_locale'];
    });
  }

  ////////////////////////////////////////////////////////////////////////
  // TRANSLATE MODULE - LIBRARY:
  //
  // Parameters:
  //    id_locale_list:      receives language parameter: (en, pt-BR, ...)
  //  
  // Variables: 
  //    lang:                modifies interface in app.component.html - standard:'English'
  //
  // Data source:            src/assets/i18n
  //
  // Use to translate:
  //    Variables or arrays:                        {{ <variable> | translate:use }}
  //    Text html or ngFor:                         Example: <span translate> text </span>
  //    Other translations, use observable object:  localeConfig.<id found in ./i18n/source.json>
  //
  switchLanguage( language : string ) {
    this.lang = language; //Variable visible to the user by the template
    this.translate.use( this.id_locale_list[ language ]); //ngx library
    this.localeService.SetLocaleConfig( this.id_locale_list[ language ]); //Defining locale for translation service
    this.adapter.setLocale( this.id_locale_list[ language ]); //Local setting for date mask
  };

} 





 

