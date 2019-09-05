import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from './role.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get<{status: string, roles: any}>(
      environment.serverAddress + 'api/role'
    ).pipe(
      map(response => {
        return response.roles.map(role => {
          return {
            id: role._id,
            name: role.name
          };
        });
      })
    );
  }

  getRole(id) {
    return this.httpClient.get<{status: string, role: any}>(
      environment.serverAddress + 'api/role/' + id
    ).pipe(
      map(response => {
        return {
          id: response.role._id,
          name: response.role.name
        };
      })
    );
  }

  addRole(name: string) {
    const postData = {
      name
    };
    return this.httpClient.post<{status: string, role: Role}>(
      environment.serverAddress + 'api/role',
      postData
    );
  }

  updateRole(id: string, name: string) {
    const postData = {
      name
    };
    return this.httpClient.put<{status: string, message: string}>(
      environment.serverAddress + 'api/role/' + id,
      postData
    );
  }

  deleteRole(id: string) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/role/' + id
    );
  }
}
