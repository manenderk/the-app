import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '../organization.service';
import { previewImage } from '../../utils/preview-image';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  public addOrgForm: FormGroup;
  public logoPreview: string;

  constructor(
    private orgService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addOrgForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      active: new FormControl(null, {
        validators: [Validators.required]
      }),
      logo: new FormControl()
    });
  }

  previewLogo(event: Event) {
    previewImage(event).then((fileObj: { file: any; imagePreview: string }) => {
      this.logoPreview = fileObj.imagePreview;
      this.addOrgForm.patchValue({
        logo: fileObj.file
      });
      this.addOrgForm.get('logo').updateValueAndValidity();
    });
  }

  addOrganization() {
    if (this.addOrgForm.invalid) {
      return;
    }
    this.orgService
      .addOrganization(
        this.addOrgForm.value.name,
        this.addOrgForm.value.description,
        this.addOrgForm.value.logo,
        this.addOrgForm.value.active
      )
      .subscribe(
        response => {
          if (response.status === 'success') {
            Swal.fire(
              'Success',
              'Organization is added successfully',
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
