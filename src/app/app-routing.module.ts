import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './users/register-user/register-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';


const routes: Routes = [
  {path: '', component: ListUsersComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'user-details/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
