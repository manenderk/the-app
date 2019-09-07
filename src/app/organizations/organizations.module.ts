import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationService } from './organization.service';
import { ListOrganizationComponent } from './list-organization/list-organization.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { AssociateOrganizationComponent } from './associate-organization/associate-organization.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGaurd } from '../auth/auth.gaurd';
import { AssociationRequestsComponent } from './association-requests/association-requests.component';


const routes: Routes = [
  {
    path: 'organizations',
    component: ListOrganizationComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'organization-details/:id',
    component: OrganizationDetailComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'add-organization',
    component: AddOrganizationComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'edit-organization/:id',
    component: EditOrganizationComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'associate-organization',
    component: AssociateOrganizationComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'association-requests',
    component: AssociationRequestsComponent,
    canActivate: [AuthGaurd]
  }
];


@NgModule({
  declarations: [
    ListOrganizationComponent,
    AddOrganizationComponent,
    EditOrganizationComponent,
    OrganizationDetailComponent,
    AssociateOrganizationComponent,
    AssociationRequestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    OrganizationService
  ]
})
export class OrganizationsModule { }
