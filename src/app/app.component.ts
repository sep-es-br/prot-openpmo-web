import { Component, OnInit, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from './services/locale/locale-service.service';
import { LocaleConfig } from './model/locale-config';
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
  localeConfig: LocaleConfig = new LocaleConfig();

  constructor ( private translate: TranslateService, 
                private localeService: LocaleService, 
                private adapter: DateAdapter<any> ) {
    translate.setDefaultLang('en');
    this.localeService.SetLocaleConfig('en');
  }

  ngOnInit() {
    this.adapter.setLocale('en');
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
    this.adapter.setLocale(language);
  };

  ////////////////////////////////////////////////////////////////////////
  //  FUNCTION - MENSAGE DIALOGS SHOW TO THE USER
  //
  //  function ( <mensage> : string ) => Retur: translated message
  //  Translate id: lang ( 'en' or 'pt-BR' )
  //
  localeTranslate = function ( mensage : string ) {
    let translated : string;

    if ( this.lang == 'en' ) {
      switch ( mensage ) {

        // Dialog of office.component.ts
        case          'SorryOffice' : { translated = "Sorry, you can not delete a plan that contains nested workpacks.";                                                break; }
        case            'Assurance' : { translated = "Are you sure to delete ";                                                                                         break; }
        case              'Warning' : { translated = "Warning";                                                                                                         break; }
        case            'Attention' : { translated = "Attention";                                                                                                       break; }
        case               'YES_NO' : { translated = "YES_NO";                                                                                                          break; }

        // Dialog of home.component.ts
        case          'SorryHome_1' : { translated = "Sorry, you can not delete this office because it is has plans.";                                                  break; }
        case          'SorryHome_2' : { translated = "Sorry, you can not delete this office because it is has plan structures.";                                        break; }
        case        'AssuranceHome' : { translated = "Are you sure to delete the office ";                                                                              break; }

        // Dialog of office-admin.component.ts - implement: ( YES_NO, Assurance, Warning, Attention )
        case     'SorryOfficeAdmin' : { translated = "Sorry, you can not delete a plan structure that contains nested workpack models.";                                break; }
      
      }
    }

    if( this.lang == 'pt-BR' ) {
      switch ( mensage ) {

        // Dialog of office.component.ts
        case          'SorryOffice' : { translated = "Desculpe, você não pode excluir um plano que contenha pacotes de trabalho aninhados.";                            break; }
        case      'AssuranceOffice' : { translated = "Você tem certeza que quer deletar ";                                                                              break; }
        case              'Warning' : { translated = "Aviso";                                                                                                           break; }
        case            'Attention' : { translated = "Atenção";                                                                                                         break; }
        case               'YES_NO' : { translated = "SIM_NÃO";                                                                                                         break; }

        // Dialog of home.component.ts
        case          'SorryHome_1' : { translated = "Desculpe, você não pode excluir este escritório porque possui planos.";                                           break; }
        case          'SorryHome_2' : { translated = "Desculpe, você não pode excluir este escritório porque possui estruturas de plano.";                              break; }
        case        'AssuranceHome' : { translated = "Você tem certeza de excluir o escritório ";                                                                       break; }

        // Dialog of office-admin.component.ts - implement: ( YES_NO, Assurance, Warning, Attention )
        case     'SorryOfficeAdmin' : { translated = "Desculpe, você não pode excluir uma estrutura de plano que contenha modelos de pacote de trabalho aninhados.";    break; }

      }
    }

    return translated;
  }

} 





 

