// //import { AuthHttp } from '@auth0/angular-jwt';
// import { Injectable } from '@angular/core';

// import { environment } from './../../environments/environment';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LogoutService {

//   tokensRenokeUrl: string;

//   constructor(
//     //private http: AuthHttp,
//     private auth: AuthService
//   ) {
//     this.tokensRenokeUrl = `${environment.databaseHost + environment.oauthAPI}/tokens/revoke`;
//   }

//   logout() {
//     return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
//       .toPromise()
//       .then(() => {
//         this.auth.limparAccessToken();
//       });
//   }

// }
