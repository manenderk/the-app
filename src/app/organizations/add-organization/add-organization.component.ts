import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  public addOrgForm: FormGroup;

  constructor(public orgService: OrganizationService ) { }

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
      logo: new FormControl(null)
    });
  }

  addOrganization() {

  }

}
