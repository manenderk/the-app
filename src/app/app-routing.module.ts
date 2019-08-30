import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './users/register-user/register-user.component';


const routes: Routes = [
  {path: '', component: ListUsersComponent},
  {path: 'users', component: ListUsersComponent},
  {path: 'register', component: RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
