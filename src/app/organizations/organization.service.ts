import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from './organization.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OrganizationRequest } from './organization-request.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(public httpClient: HttpClient) { }

  getOrganizations(activeOnly: boolean = false) {
    return this.httpClient.get<{status: string, organizations: any}>(
      environment.serverAddress + 'api/organization/?activeonly=' + activeOnly.toString()
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

  addOrganization(name: string, description: string, logo: File, active: boolean) {
    const postData = new FormData();
    postData.append('name', name);
    postData.append('description', description);
    postData.append('logo', logo);
    postData.append('active', active.toString());

    return this.httpClient.post<{status: string, organization: Organization}>(
      environment.serverAddress + 'api/organization',
      postData
    );
  }

  updateOrganization(id: string, name: string, description: string, logo: File | string, active: boolean) {
    let postData;
    if (typeof logo === 'string') {
      postData = {
        name,
        description,
        logo,
        active
      };
    } else {
      postData = new FormData();
      postData.append('name', name);
      postData.append('description', description);
      postData.append('logo', logo);
      postData.append('active', active);
    }

    return this.httpClient.put<{status: string, message: string}>(
      environment.serverAddress + 'api/organization/' + id,
      postData
    );
  }

  deleteOrganization(id: string) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/organization/' + id
    );
  }

  requestAssociation(userId: string, organizationId: string) {
    const postData = {
      user_id: userId,
      organization_id: organizationId
    };

    return this.httpClient.post<{status: string, association: any}>(
      environment.serverAddress + 'api/pending-organization-association',
      postData
    );
  }

  getPendingAssociations(userId: string = '') {
    return this.httpClient.get<{status: string, associations: any}>(
      userId !== '' ?
        environment.serverAddress + 'api/pending-organization-association/?user=' + userId :
        environment.serverAddress + 'api/pending-organization-association/'
    ).pipe(
      map(response => {
        return response.associations.map(association => {
          return {
            id: association._id,
            user_id: association.user_id,
            organization_id: association.organization_id
          };
        });
      })
    );
  }

  approveAssociation(id) {
    const postData = {
      association_id: id
    };
    return this.httpClient.post<{ status: string; message: string }>(
      environment.serverAddress + 'api/pending-organization-association/approve',
      postData
    );
  }

  deleteAssociation(id) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/pending-organization-association/' + id
    );
  }

  getOrganizationRequests() {
    return this.httpClient.get<{status: string, organization_requests: any}>(
      environment.serverAddress + 'api/organization-request/'
    ).pipe(
      map(response => {
        return response.organization_requests.map(organizationRequest => {
          return {
            id: organizationRequest._id,
            user_id: organizationRequest.user_id,
            organization_name: organizationRequest.organization_name
          };
        });
      })
    );
  }

  addOrganizationRequest(userId: string, organizationName: string) {
    const postData = {
      user_id: userId,
      organization_name: organizationName
    };

    return this.httpClient.post<{status: string, organizationRequest: OrganizationRequest }>(
      environment.serverAddress + 'api/organization-request/',
      postData
    );
  }

  rejectOrganizationRequest(id) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/organization-request/' + id
    );
  }

  approveOrganizationRequest(id) {
    const postData = {
      request_id : id
    };
    return this.httpClient.post<{ status: string; message: string }>(
      environment.serverAddress + 'api/organization-request/approve',
      postData
    );
  }
}
