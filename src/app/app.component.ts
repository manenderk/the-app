import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the-app';
  public isLoading = false;
  public isAuthenticated = false;
  private authStateSub: Subscription;
  private loadingStateSub: Subscription;

  constructor(private authService: AuthService, private appService: AppService) {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.authStateSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.loadingStateSub = this.appService.getLoadingState().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
