import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';


const routes: Routes = [
  {path: '', component: ListUsersComponent},
  {path: '', loadChildren: './users/users.module#UsersModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
