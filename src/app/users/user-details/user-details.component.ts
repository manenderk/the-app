import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { OrganizationService } from 'src/app/organizations/organization.service';
import { RoleService } from 'src/app/roles/role.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;
  public roleName = '';
  public organizationName = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private orgService: OrganizationService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id') ) {
        const id = paramMap.get('id');
        this.userService.getUser(id).subscribe(response => {
          if (response.status === 'success') {
            this.user = {
              id: response.user._id,
              first_name: response.user.first_name,
              middle_name: response.user.middle_name,
              last_name: response.user.last_name,
              email: response.user.email,
              password: '',
              employee_id: response.user.employee_id,
              organization_id: response.user.organization_id,
              role_id: response.user.role_id,
              dob: response.user.dob,
              doj: response.user.doj,
              active: response.user.active,
              created: response.user.created,
              modified: response.user.modified
            };

            if (this.user.organization_id) {
              this.orgService.getOrganization(this.user.organization_id).subscribe( org => {
                this.organizationName = org.name;
              });
            }

            if (this.user.role_id) {
              this.roleService.getRole(this.user.role_id).subscribe(role => {
                this.roleName = role.name;
              });
            }
          }
        });
      } else {
        this.router.navigate(['/users']);
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire(
          'Success',
          'User is deleted',
          'success'
        );
        this.router.navigate(['/users']);
      }
    });
  }
}
