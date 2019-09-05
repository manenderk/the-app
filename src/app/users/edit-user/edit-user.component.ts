import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public userId: string;

  public editUserForm: FormGroup;

  constructor(public userService: UserService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {

    this.editUserForm = new FormGroup({
      first_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      middle_name: new FormControl(),
      last_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      employee_id: new FormControl(),
      organization_id: new FormControl(),
      role_id: new FormControl(),
      dob: new FormControl(null, {
        validators: [Validators.required]
      }),
      active: new FormControl()
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id') ) {
        this.userId = paramMap.get('id');
        this.userService.getUser(this.userId).subscribe(response => {
          if (response.status === 'success') {
            this.editUserForm.setValue({
              first_name: response.user.first_name,
              middle_name: response.user.middle_name,
              last_name: response.user.last_name,
              email: response.user.email,
              employee_id: response.user.employee_id,
              organization_id: response.user.organization_id ? response.user.organization_id : '',
              role_id: response.user.role_id ? response.user.role_id : '',
              dob: new Date(response.user.dob),
              active: response.user.active
            });
          }
        });
      } else {
        this.router.navigate(['/users']);
      }
    });
  }

  public updateUser() {
    if (this.editUserForm.invalid) {
      return;
    }
    this.userService.updateUser(
      this.userId,
      this.editUserForm.value.first_name,
      this.editUserForm.value.middle_name,
      this.editUserForm.value.last_name,
      this.editUserForm.value.email,
      this.editUserForm.value.employee_id,
      this.editUserForm.value.organization_id,
      this.editUserForm.value.role_id,
      this.editUserForm.value.dob,
      this.editUserForm.value.active
    ).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire(
            'Success',
            'User details are updated',
            'success'
          );
          this.router.navigate(['/users']);
        } else {
          Swal.fire(
            'Error',
            'User details are not updated',
            'error'
          );
        }
      },
      error => {
        Swal.fire(
          'Error',
          'User Details are not updated',
          'error'
        );
      }
    );
  }

}
