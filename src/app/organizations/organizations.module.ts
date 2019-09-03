import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationService } from './organization.service';
import { ListOrganizationComponent } from './list-organization/list-organization.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'organizations', component: ListOrganizationComponent },
  { path: 'organization-details/:id', component: OrganizationDetailComponent },
  { path: 'add-organization', component: AddOrganizationComponent }
];


@NgModule({
  declarations: [ListOrganizationComponent, AddOrganizationComponent, EditOrganizationComponent, OrganizationDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OrganizationService
  ]
})
export class OrganizationsModule { }
