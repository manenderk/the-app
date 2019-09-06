import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStateListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor() { }

  setAuthData(token: string, expiresIn: number, userName: string, userId: string) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-expires-in', expirationDate.toISOString());
    localStorage.setItem('auth-user-name', userName);
    localStorage.setItem('auth-user-id', userId);
    this.isAuthenticated = true;
    this.authStateListener.next(this.isAuthenticated);
  }

  clearAuthData() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-expires-in');
    localStorage.removeItem('auth-user-name');
    localStorage.removeItem('auth-user-id');
    this.isAuthenticated = false;
    this.authStateListener.next(this.isAuthenticated);
  }

  isLoggedIn() {
    const token = localStorage.getItem('auth-token');
    const expirationDate = localStorage.getItem('auth-expires-in');

    if (token && expirationDate) {
      const now = new Date();
      const expiration = new Date(expirationDate);
      console.log('SESSION Will EXPIRES IN ' + (expiration.getTime() - now.getTime()) / 1000 + ' seconds');
      if (expiration.getTime() - now.getTime() > 0 ) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    } else {
      this.isAuthenticated = false;
    }
    this.authStateListener.next(this.isAuthenticated);
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStateListener.asObservable();
  }

  getAuthUserDetails() {
    return {
      id : localStorage.getItem('auth-user-id'),
      name: localStorage.getItem('auth-user-name')
    };
  }

}
