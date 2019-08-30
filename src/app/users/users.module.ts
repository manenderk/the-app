import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './user.service';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [ListUsersComponent, RegisterUserComponent, UserDetailsComponent, EditUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    UserService
  ],
  exports: [
    ListUsersComponent,
    RegisterUserComponent,
    UserDetailsComponent,
    EditUserComponent
  ]
})
export class UsersModule { }
