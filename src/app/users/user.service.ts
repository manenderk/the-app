import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  constructor(private httpClient: HttpClient, private router: Router) { }

  getUsers() {
    return this.httpClient.get<{status: string, users: any}>(
      environment.serverAddress + 'api/user/'
    ).pipe(
      map(response => {
        return  response.users.map(user => {
            return {
              id: user._id,
              first_name: user.first_name,
              middle_name: user.middle_name ? user.middle_name : '',
              last_name: user.last_name,
              email: user.email,
              password: '',
              employee_id: user.emaployee_id ? user.emaployee_id : '',
              organization_id: user.organization_id ? user.organization_id : '',
              role_id: user.role_id,
              active: user.active,
              created: user.created,
              modified: user.modified
            };
          });
      })
    );
  }

  getUser(id: string) {
    return this.httpClient.get<{status: string, user: any}>(environment.serverAddress + 'api/user/' + id);
  }

  registerUser(firstName: string, lastName: string, email: string, password: string) {
    const postData = {
      first_name: firstName,
      last_name: lastName,
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      password: password
    };
    return this.httpClient.post<{status: string, user: any}>(environment.serverAddress + 'api/user', postData);
  }

  deleteUser(id: string) {
    return this.httpClient.delete<{status: string, message: string}>  (environment.serverAddress + 'api/user/' + id);
  }

  loginUser(email: string, password: string) {
    const postData = {
      email,
      password
    };
    return this.httpClient.post<{status: string, token: string, expiresIn: number}>(
      environment.serverAddress + 'api/user/login', postData
    ).pipe(
      map(response => {
        return {
          status: response.status,
          token: response.token,
          expiresIn: response.expiresIn
        };
      }
    ));
  }
}
