import { Injectable, OnInit } from '@angular/core';
import { LocaleConfig, EN_CONFIG, PT_BR_CONFIG, Mensage } from 'src/app/model/locale-config';
import { NgSwitchCase } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class LocaleService implements OnInit{
  
  // Observable property for the array of localeConfig
  private $localeConfig = new BehaviorSubject<LocaleConfig>(new LocaleConfig);
  localeConfig = this.$localeConfig.asObservable();




  
  private $mensage = new BehaviorSubject<Mensage>(new Mensage);
  mensage = this.$mensage.asObservable();

  


  private dialogs:any;

  ngOnInit(): void {
    
  }

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
    switch (locale){

      case 'en':{
        this.$localeConfig.next(EN_CONFIG);
        break;
      }

      case 'pt-BR':{
        this.$localeConfig.next(PT_BR_CONFIG);
        break;
      }
    }

    this.httpClient.get('../../../assets/i18n/' + locale + '.json').subscribe (data => {
      this.dialogs = data;
    });
  }

  

  // SetMensage (locale:string) {
  //   this.httpClient.get('../../../assets/i18n/' + locale + '.json').subscribe (data => {
  //     this.dialogs = data;
  //     console.log(this.dialogs['Name']);
  //   }); 
    
  //   this.$mensage.next(this.dialogs);
  // }

  GetMensage (id:string) {
     return this.dialogs[id];
  }

}
