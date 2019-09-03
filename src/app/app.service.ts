import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private loadingStateListener = new Subject<boolean>();
  private isLoading = false;

  constructor() { }

  setLoader(state: boolean) {
    this.isLoading = state;
    this.loadingStateListener.next(this.isLoading);
  }

  getLoadingState() {
    return this.loadingStateListener.asObservable();
  }

}
