import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtModule } from '@auth0/angular-jwt';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';

import { environment } from '../../environments/environment';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
   //InputTextModule,
    //ButtonModule,


    //SegurancaRoutingModule
  ],
  declarations: [
    //LoginFormComponent
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
