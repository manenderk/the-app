import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserService } from 'src/app/users/user.service';
import Swal from 'sweetalert2';
import { AssoicationRequests } from './association-requests.model';

@Component({
  selector: 'app-association-requests',
  templateUrl: './association-requests.component.html',
  styleUrls: ['./association-requests.component.css']
})
export class AssociationRequestsComponent implements OnInit {

  constructor(private orgService: OrganizationService, private userService: UserService) { }

  associationRequest: AssoicationRequests[];



  columnsToDisplay = ['user_id', 'organization_id', 'actions'];

  ngOnInit() {
    this.getPendingAssociations();
  }

  getPendingAssociations() {
    this.orgService.getPendingAssociations().subscribe(response => {
      this.associationRequest = response;
      this.associationRequest.map((association: AssoicationRequests) => {
        const a = association;
        this.userService.getUser(association.user_id).subscribe(u => {
          a.user_id = u.user.email;
        });
        this.orgService.getOrganization(association.organization_id).subscribe(o => {
          a.organization_id = o.name;
        });
        return a;
      });
    });
  }

  approveAssociation(id) {
    this.orgService.approveAssociation(id).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire('Success', 'Association Accepted', 'success');
          this.getPendingAssociations();
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error => {
        Swal.fire('Error', error, 'error');
      }
    );
  }

  rejectAssociation(id) {
    this.orgService.deleteAssociation(id).subscribe(
      response => {
        if (response.status === 'success') {
          Swal.fire('Success', 'Association Rejected', 'success');
          this.getPendingAssociations();
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error => {
        Swal.fire('Error', error , 'error');
      }
    );
  }


}
