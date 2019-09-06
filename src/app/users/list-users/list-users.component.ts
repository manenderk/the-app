import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { OrganizationService } from 'src/app/organizations/organization.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users: User[] = [];
  public columnsToDisplay: string[] = ['email', 'first_name', 'last_name', 'organization_id', 'active'];
  constructor(private userService: UserService, private orgService: OrganizationService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(userData => {
      this.users = userData;

      this.users.map((user: User) => {
        const u: User = user;
        if (user.organization_id) {
          this.orgService.getOrganization(user.organization_id).subscribe(response => {
            u.organization_id = response.name;
          });
        }
        return u;
      });
    });
  }
}
