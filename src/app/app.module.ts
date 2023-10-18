import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { CanDeactivateGuard } from './users/can-deactivate-guard.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './users/users.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    ErrorPageComponent,
    LoginComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginService,
    UserService,
    CanDeactivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
