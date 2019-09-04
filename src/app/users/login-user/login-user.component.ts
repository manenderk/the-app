import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  public loginForm: FormGroup;
  public loginFailed = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/users']);
    }


    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.appService.setLoader(true);
    this.userService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        response => {
          if (response.token) {
            this.authService.setAuthData(response.token, response.expiresIn);
            this.appService.setLoader(false);
            this.router.navigate(['/users']);
          }
        },
        error => {
          this.appService.setLoader(false);
          this.loginFailed = true;
        }
      );
  }
}
