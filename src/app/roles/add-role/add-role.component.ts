import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  addRoleForm: FormGroup;

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this.addRoleForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addRole() {
    if (this.addRoleForm.invalid) {
      return;
    }
    this.roleService.addRole(this.addRoleForm.value.name).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire(
            'Success',
            'Role is added successfully',
            'success'
          );
          this.router.navigate(['/roles']);
        } else {
          Swal.fire('Error', 'Role could not be saved', 'error');
        }
      },
      error => {
        Swal.fire(
          'Error',
          'Role could not be saved',
          'error'
        );
      }
    );
  }

}
