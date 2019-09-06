import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authUserDetails: {
    id: string,
    name: string
  };
  private authServiceSub: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.isAuthenticated = this.authService.isLoggedIn();
    this.authServiceSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.authUserDetails = this.authService.getAuthUserDetails();
      }
    });
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }

  logout() {
    this.authService.clearAuthData();
    this.router.navigate(['/login']);
  }

}
