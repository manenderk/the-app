import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users: User[] = [];
  columnsToDisplay: string[] = ['email', 'first_name', 'last_name'];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(userData => {
      this.users = userData;
    });
  }

}
