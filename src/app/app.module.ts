import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationsModule } from './organizations/organizations.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ChatModule } from './chat/chat.module';
import { SocketService } from './socket.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    LayoutModule,
    UsersModule,
    OrganizationsModule,
    AuthModule,
    RolesModule,
    ChatModule
  ],
  providers: [AppService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
