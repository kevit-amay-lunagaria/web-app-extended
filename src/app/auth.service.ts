import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  loggedIn = false;

  constructor(private router: Router) {}

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promise;
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(['/']);
  }
}
