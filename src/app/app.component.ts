import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'openpmo-web';

  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
  }

  lang:string = "En";

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);

    if (language == "en")
      this.lang = "En";
    if (language == "pt-BR")
      this.lang = "Pt-BR"; 
  }
}

 

