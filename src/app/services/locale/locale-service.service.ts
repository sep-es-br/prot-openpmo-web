import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LocaleService - Extending ngx-translate library functionality to components.ts
//
//  languagePack: object responsible for packaging all available translations imported from the .json translation file
//  Return: none
// 
export class LocaleService {
  
  // Observable property for the array of localeConfig
  private $localeConfig = new BehaviorSubject<Object>(new Object);
  localeConfig = this.$localeConfig.asObservable();
   
  private languagePack : any;

  constructor ( private httpClient : HttpClient ) {
    this.SetLocaleConfig('en');    
  }

  // Set language code settings based on locale key
  SetLocaleConfig ( locale : string ) {

    this.httpClient.get('../../../assets/i18n/' + locale + '.json').subscribe (data => {
      this.languagePack = data['Data_for_LocaleService'];
      this.$localeConfig.next(this.languagePack);
    });
  }

}
