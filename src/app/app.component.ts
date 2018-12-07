import { Component, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale/locale-service.service';
import { DateAdapter } from '@angular/material/core';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang : string = "en";

  constructor ( private translate: TranslateService, 
                private localeService: LocaleService, 
                private adapter: DateAdapter<any> ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.adapter.setLocale('en');
    this.localeService.SetLocaleConfig('en');
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
  //    Other translations:        Use observable object: localeConfig.<id in ./i18n/file.json>
  //
  switchLanguage(language: string) {
    this.translate.use(language); //ngx library
    this.lang = language; //Variable visible to the user by the template
    this.localeService.SetLocaleConfig(language); //Defining locale for translation service
    this.adapter.setLocale(language); //Local setting for date mask
  };

} 





 

