import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization.model';
import { OrganizationService } from '../organization.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  public organization: Organization;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        const orgId = paramMap.get('id');
        this.organizationService.getOrganization(orgId).subscribe(org => {
          this.organization = org;
        });
      }
    });
  }

  deleteOrganization(id: string) {
    this.organizationService.deleteOrganization(id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire(
          'Success',
          'Organization Deleted',
          'success'
        );
        this.router.navigate(['/organizations']);
      }
    });
  }
}
