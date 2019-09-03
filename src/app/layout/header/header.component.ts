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

  public isAuthenticated = false;
  private authServiceSub: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authServiceSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
