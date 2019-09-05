import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStateListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor() { }

  setAuthData(token: string, expiresIn: number) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-expires-in', expirationDate.toISOString());
    this.isAuthenticated = true;
    this.authStateListener.next(this.isAuthenticated);
  }

  clearAuthData() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-expires-in');
    this.isAuthenticated = false;
    this.authStateListener.next(this.isAuthenticated);
  }

  isLoggedIn() {
    const token = localStorage.getItem('auth-token');
    const expirationDate = localStorage.getItem('auth-expires-in');

    if (token && expirationDate) {
      const now = new Date();
      const expiration = new Date(expirationDate);
      console.log('SESSION EXPIRES IN: ' + (expiration.getTime() - now.getTime()));
      if (expiration.getTime() - now.getTime() > 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getAuthStatusListener() {
    return this.authStateListener.asObservable();
  }

}
