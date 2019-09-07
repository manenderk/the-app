import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-association-requests',
  templateUrl: './association-requests.component.html',
  styleUrls: ['./association-requests.component.css']
})
export class AssociationRequestsComponent implements OnInit {

  constructor(private orgService: OrganizationService) { }

  pendingAssociations: {
    user_id: string,
    organization_id: string
  }[];

  ngOnInit() {

    this.orgService.getPendingAssociations().subscribe(response => {
      console.log(response);
    });

  }

}
