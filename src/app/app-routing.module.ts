import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './users/login-user/login-user.component';


const routes: Routes = [
  {path: '', component: LoginUserComponent},
  {path: '', loadChildren: './users/users.module#UsersModule'},
  {path: '', loadChildren: './organizations/organizations.module#OrganizationsModule'},
  {path: '', loadChildren: './roles/roles.module#RolesModule'},
  {path: '', loadChildren: './feeds/feeds.module#FeedsModule'},
  {path: '', loadChildren: './chat/chat.module#ChatModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
