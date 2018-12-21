import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/services/locale/locale-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  localeConfig: Object = new Object();

  constructor(
    private authService: AuthService,
    private router: Router,
    private localeService: LocaleService ) { }

  subscriptions: Subscription[] = [];
  user: String = '';
  password: String = '';

  ngOnInit() {

    //Translate Service
    this.subscriptions.push(
      this.localeService.localeConfig.subscribe(config => {
          this.localeConfig = config;
        }
      )
    ); 
  }

  onSubmit(){
    this.authService.login(this.user as string, this.password as string)
    .then(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
