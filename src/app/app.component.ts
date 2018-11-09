import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'openpmo-web';
  lang : string = "en";

  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  //Translation module
  switchLanguage(language: string) {
    this.translate.use(language);
    this.lang = language;    
  }

}

 

