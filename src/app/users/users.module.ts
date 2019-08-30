import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './user.service';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListUsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    UserService
  ],
  exports: [
    ListUsersComponent
  ]
})
export class UsersModule { }
