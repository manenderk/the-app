import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from '../user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  public loginForm: FormGroup;
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
          this.appService.setLoader(false);
          if (response.status === 'error') {
            Swal.fire('Error', response.message, 'error');
          } else if (response.token) {
            this.authService.setAuthData(response.token, response.expiresIn, response.userName, response.userId);
            this.userService.getUser(response.userId).subscribe(userResponse => {
              if (userResponse.user.organization_id) {
                console.log('You are associated with an organization');
                this.router.navigate(['/users']);
              } else {
                console.log('You are not associated with any organization');
                this.router.navigate(['/associate-organization']);
              }
            });
          }
        },
        error => {
          this.appService.setLoader(false);
          Swal.fire('Error', 'Request Error', 'error');
        }
      );
  }
}
