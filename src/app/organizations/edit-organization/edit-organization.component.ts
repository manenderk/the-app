import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '../organization.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Organization } from '../organization.model';
import { previewImage } from '../../utils/preview-image';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  orgId: string;
  org: Organization;
  editOrgForm: FormGroup;
  logoPreview: string;

  constructor(private orgService: OrganizationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editOrgForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      active: new FormControl(),
      logo: new FormControl()
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.orgId = paramMap.get('id');
        this.orgService.getOrganization(this.orgId).subscribe(org => {
          this.org = org;
          this.editOrgForm.setValue({
            name: org.name,
            description: org.description ? org.description : '',
            active: org.active,
            logo: org.logo ? org.logo : ''
          });
          this.logoPreview = org.logo;
        });
      }
    });

  }

  previewLogo(event: Event) {
    previewImage(event).then((fileObj: { file: any; imagePreview: string }) => {
      this.logoPreview = fileObj.imagePreview;
      this.editOrgForm.patchValue({
        logo: fileObj.file
      });
      this.editOrgForm.get('logo').updateValueAndValidity();
    });
  }

  updateOrg() {
    if (this.editOrgForm.invalid) {
      return;
    }
    this.orgService.updateOrganization(
      this.org.id,
      this.editOrgForm.value.name,
      this.editOrgForm.value.description,
      this.editOrgForm.value.logo,
      this.editOrgForm.value.active
    ).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire(
            'Success',
            'Organization is updated successfully',
            'success'
          );
          this.router.navigate(['/organizations']);
        } else {
          Swal.fire('Error', 'Organization could not be saved', 'error');
        }
      },
      error => {
        Swal.fire(
          'Error',
          'Organization could not be saved',
          'error'
        );
      }
    );
  }

}
