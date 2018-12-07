import { Injectable, OnInit } from '@angular/core';
import { NgSwitchCase } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class LocaleService {
  
  // Observable property for the array of localeConfig
  private $localeConfig = new BehaviorSubject<Object>(new Object);
  localeConfig = this.$localeConfig.asObservable();
   
  private dialogs:any;

  constructor(private httpClient:HttpClient) {
    this.SetLocaleConfig('en');    
   }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the locale formet configurations based on the locale key
  // 
  // Return: none
  // 
  SetLocaleConfig(locale:string) {

    this.httpClient.get('../../../assets/i18n/' + locale + '.json').subscribe (data => {
      this.dialogs = data;
      this.$localeConfig.next(this.dialogs);
    });
  }

}
