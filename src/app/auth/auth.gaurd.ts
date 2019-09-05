import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()

export class AuthGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      Swal.fire(
        'Authentication Error',
        'You are not allowed to access this page',
        'error'
      );
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
