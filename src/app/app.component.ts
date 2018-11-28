import { Component, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale/locale-service.service';
import { LocaleConfig } from './model/locale-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang : string = "en";
  localeConfig: LocaleConfig = new LocaleConfig();

  constructor(private translate: TranslateService, private localeService: LocaleService){
    translate.setDefaultLang('en');
    this.localeService.SetLocaleConfig('en');
  }

  ngOnInit() {
    // this.localeService.localeConfig.subscribe(
    //   (conf) => {
    //     this.localeConfig = conf;
    //   }
    // );
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
    this.localeService.SetLocaleConfig(language);
  }
  
}



 

