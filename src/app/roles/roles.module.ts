import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from './add-role/add-role.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleService } from './role.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from '../auth/auth.gaurd';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'roles',
    component: ListRolesComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'edit-role/:id',
    component: EditRoleComponent,
    canActivate: [AuthGaurd]
  }
];


@NgModule({
  declarations: [AddRoleComponent, ListRolesComponent, EditRoleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    RoleService
  ]
})
export class RolesModule { }
