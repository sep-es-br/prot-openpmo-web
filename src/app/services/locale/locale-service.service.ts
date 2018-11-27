import { Injectable } from '@angular/core';
import { LocaleConfig, EN_CONFIG, PT_BR_CONFIG } from 'src/app/model/locale-config';
import { NgSwitchCase } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocaleService {

  // Observable property for the array of offices
  private $localeConfig = new BehaviorSubject<LocaleConfig>(new LocaleConfig);
  localeConfig = this.$localeConfig.asObservable();

  constructor() { }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the locale formet configurations based on the locale key
  // 
  // Return: none
  // 
  SetLocaleConfig(locale:string){
    switch (locale){
      case 'en':{
        this.$localeConfig.next(EN_CONFIG);
        break;
      }

      case 'pt-br':{
        this.$localeConfig.next(PT_BR_CONFIG);
        break;
      }
    }
  }

}
