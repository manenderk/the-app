import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserService } from 'src/app/users/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-association-requests',
  templateUrl: './association-requests.component.html',
  styleUrls: ['./association-requests.component.css']
})
export class AssociationRequestsComponent implements OnInit {

  constructor(private orgService: OrganizationService, private userService: UserService) { }

  pendingAssociations: {
    id: string,
    user_id: string,
    organization_id: string
  }[];



  columnsToDisplay = ['user_id', 'organization_id', 'actions'];

  ngOnInit() {

    this.getPendingAssociations();

  }

  getPendingAssociations() {
    this.orgService.getPendingAssociations().subscribe(response => {
      this.pendingAssociations = response;

      this.pendingAssociations.map((association) => {
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
    console.log(id);
  }

  rejectAssociation(id) {

  }

}
