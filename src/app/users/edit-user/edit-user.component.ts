import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: User;

  constructor(public userService: UserService, public route: ActivatedRoute, public router: Router) { }

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
              organization_id: '',
              role_id: '',
              dob: response.user.dob,
              active: response.user.active,
              created: response.user.created,
              modified: response.user.modified
            };
          }
        });
      } else {
        this.router.navigate(['/users']);
      }
    });
  }

}
