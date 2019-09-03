import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './user.service';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: 'users', component: ListUsersComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'edit-user/:id', component: EditUserComponent }
];

@NgModule({
  declarations: [ListUsersComponent, RegisterUserComponent, UserDetailsComponent, EditUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
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
