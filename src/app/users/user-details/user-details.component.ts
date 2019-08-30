import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;
  constructor(public route: ActivatedRoute, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('id') ) {
        const id = paramMap.get('id');
        this.userService.getUser(id).subscribe(response => {
          if (response.status === 'success') {
            this.user = {
              id: response.user.id,
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
