import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../utils/must-match.validator';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public registrationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/users']);
    }

    this.registrationForm = this.formBuilder.group({
      first_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      last_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      password2: new FormControl(null, {
        validators: [Validators.required]
      })
    }, {
      validator: MustMatch('password', 'password2')
    });
  }


  registerUser() {
    // return if form is not valid
    if (!this.registrationForm.valid) {
      return;
    }

    this.userService.registerUser(
      this.registrationForm.value.first_name,
      this.registrationForm.value.last_name,
      this.registrationForm.value.email,
      this.registrationForm.value.password
    ).subscribe(response => {
      if (response.status === 'success') {
        this.registrationForm.reset();
        this.registrationForm.updateValueAndValidity();
        Swal.fire(
          'Success',
          'You are registered',
          'success'
        );
      }
    });
  }
}
