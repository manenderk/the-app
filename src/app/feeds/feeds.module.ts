import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
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
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedsModule { }
