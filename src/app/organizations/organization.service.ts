import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from './organization.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(public httpClient: HttpClient) { }

  getOrganizations() {
    return this.httpClient.get<{status: string, organizations: any}>(
      environment.serverAddress + 'api/organization'
    ).pipe(
      map(response => {
        return response.organizations.map(org => {
          return {
            id: org._id,
            name: org.name,
            description: org.description,
            logo: org.logo,
            active: org.active,
            created: org.created,
            modified: org.modified
          };
        });
      })
    );
  }

  getOrganization(id: string) {
    return this.httpClient.get<{ status: string; organization: any }>(
      environment.serverAddress + 'api/organization/' + id
    ).pipe(
      map(response => {
        return {
          id: response.organization._id,
          name: response.organization.name,
          logo: response.organization.logo,
          description: response.organization.description,
          active: response.organization.active,
          created: response.organization.created,
          modified: response.organization.modified
        };
      })
    );
  }

  deleteOrganization(id: string) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/organization/' + id
    );
  }
}
