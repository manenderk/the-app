import { Component, OnInit } from '@angular/core';
import { Role } from '../role.model';
import { RoleService } from '../role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  roles: Role[];
  columnsToDisplay: string[] = ['name', 'actions'];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles(){
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  deleteRole(id) {
    this.roleService.deleteRole(id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire(
          'Success',
          'Role is Deleted',
          'success'
        );
        this.getRoles();
      } else {
        Swal.fire(
          'Error',
          'Role is not deleted',
          'error'
        );
      }
    });
  }

}
