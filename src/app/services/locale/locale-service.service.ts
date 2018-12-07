import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class LocaleService {
  
  // Observable property for the array of localeConfig
  private $localeConfig = new BehaviorSubject<Object>(new Object);
  localeConfig = this.$localeConfig.asObservable();
   
  private languagePack : any;

  constructor ( private httpClient : HttpClient ) {
    this.SetLocaleConfig('en');    
   }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the locale formet configurations based on the locale key
  // 
  // Return: none
  // 
  SetLocaleConfig ( locale : string ) {

    this.httpClient.get('../../../assets/i18n/' + locale + '.json').subscribe (data => {
      this.languagePack = data;
      this.$localeConfig.next(this.languagePack);
    });
  }

}
