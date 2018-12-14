import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  user: String = '';
  password: String = '';

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.user as string, this.password as string)
    .then(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

}
