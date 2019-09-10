import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFeedComponent } from './list-feed/list-feed.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from '../auth/auth.gaurd';

const routes: Routes = [
  {
    path: 'feeds',
    component: ListFeedComponent,
    canActivate: [AuthGaurd]
  }
];

@NgModule({
  declarations: [ListFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedsModule { }
