import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CanDeactivateGuard } from './users/can-deactivate-guard.service';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UsersComponent,
    //canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    //canActivate: [AuthGuard],
    //children: [],
  },
  {
    path: 'user-detail/:id',
    component: UserDetailComponent,
    //canActivate: [AuthGuard],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
