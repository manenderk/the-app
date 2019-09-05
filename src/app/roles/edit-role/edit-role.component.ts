import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Role } from '../role.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  role: Role;
  roleId: string;
  editRoleForm: FormGroup;

  constructor(private roleService: RoleService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editRoleForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id') ) {
        this.roleId = paramMap.get('id');
        this.roleService.getRole(this.roleId).subscribe(response => {
          this.role = response;
          this.editRoleForm.setValue({
            name: this.role.name
          });
        });
      }
    });
  }

  updateRole() {
    if (this.editRoleForm.invalid) {
      return;
    }
    this.roleService.updateRole(this.roleId, this.editRoleForm.value.name).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire(
            'Success',
            'Role is updated successfully',
            'success'
          );
          this.router.navigate(['/roles']);
        } else {
          Swal.fire(
            'Error',
            'Role could not be saved',
            'error'
          );
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
