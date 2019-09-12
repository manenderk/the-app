import { Component, OnInit } from '@angular/core';
import { OrganizationRequest } from './organization-request.model';
import { OrganizationService } from '../organization.service';
import { UserService } from 'src/app/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organization-requests',
  templateUrl: './organization-requests.component.html',
  styleUrls: ['./organization-requests.component.css']
})
export class OrganizationRequestsComponent implements OnInit {
  orgRequests: OrganizationRequest[];
  columnsToDisplay = ['organization_name', 'user_id', 'actions'];

  constructor(
    private orgService: OrganizationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.orgService.getOrganizationRequests().subscribe(requests => {
      this.orgRequests = requests;
      this.orgRequests.map(req => {
        const r = req;
        this.userService.getUser(r.user_id).subscribe(
          response => {
            r.user_id = response.user.email;
          },
          err => {
            console.log(err);
          }
        );
        return r;
      });
    });
  }

  approveOrganization(id) {
    this.orgService.approveOrganizationRequest(id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire('Success', 'Organization Request Approve', 'success');
        this.getRequests();
      } else {
        Swal.fire('Error', 'Unable to approve this Request', 'error');
      }
    });
  }

  rejectOrganization(id) {
    this.orgService.rejectOrganizationRequest(id).subscribe(response => {
      if (response.status === 'success') {
        Swal.fire('Success', 'Organization Request Rejected', 'success');
        this.getRequests();
      } else {
        Swal.fire('Error', 'Unable to reject this Request', 'error');
      }
    });
  }
}
