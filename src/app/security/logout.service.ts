import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AuthClientHttp } from './auth-client-http';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

    tokensRevokeUrl: string;

  constructor(
    private auth: AuthService,
    private http: AuthClientHttp,
    private router: Router
  ) {
    this.tokensRevokeUrl = environment.databaseHost + environment.tokensRevoke;
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
