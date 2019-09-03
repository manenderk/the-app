import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { Organization } from '../organization.model';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.css']
})
export class ListOrganizationComponent implements OnInit {

  public organizations: Organization[];
  public columnsToDisplay: string[] = ['name', 'logo', 'active', 'created', 'modified'];
  constructor(public organizationService: OrganizationService) {}

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(response => {
      this.organizations = response;
    });
  }
}
