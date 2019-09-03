import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStateListener = new Subject<boolean>();
  public isAuthenticated = false;

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('auth-token', token);
    this.isAuthenticated = true;
    this.authStateListener.next(this.isAuthenticated);
  }

  deleteToken() {
    localStorage.removeItem('auth-token');
    this.isAuthenticated = false;
    this.authStateListener.next(this.isAuthenticated);
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStateListener.asObservable();
  }

}
