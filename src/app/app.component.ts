import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { SocketService } from './socket.service';

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

  private userData: {
    id: string,
    name: string
  };

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private socketService: SocketService
  ) {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.authStateSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.userData = this.authService.getAuthUserDetails();
          this.socketService.joinSocket(this.userData.id);
        }
      });

    this.loadingStateSub = this.appService
      .getLoadingState()
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }
}
