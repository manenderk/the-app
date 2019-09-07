import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-associate-organization',
  templateUrl: './associate-organization.component.html',
  styleUrls: ['./associate-organization.component.css']
})
export class AssociateOrganizationComponent implements OnInit {

  organizationList: {
    id: string,
    name: string
  };
  selectOrgForm: FormGroup;
  addOrgForm: FormGroup;
  associationSubmitted = false;
  organizationName: string;

  private userData: {
    id: string,
    name: string
  };

  constructor(
    private orgService: OrganizationService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.userData = this.authService.getAuthUserDetails();

    this.orgService.getPendingAssociations(this.userData.id).subscribe(response => {
      if (response && response.length > 0) {
        this.associationSubmitted = true;
        this.orgService.getOrganization(response[0].organization_id).subscribe(org => {
          this.organizationName = org.name;
        });
      }
    });

    this.selectOrgForm = new FormGroup({
      organization_id: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.addOrgForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.orgService.getOrganizations(true).subscribe(response => {
      this.organizationList = response.map(org => {
        return {
          id: org.id,
          name: org.name
        };
      });
    });
  }

  associateOrganization() {
    this.orgService.requestAssociation(this.userData.id, this.selectOrgForm.value.organization_id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire('Success', 'Your request is submitted', 'success');
      }
    });
  }

  addOrganization() {

  }
}
