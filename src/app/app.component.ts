import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  show: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (this.authService.loggedIn) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });
  }

  onLogOut() {
    this.authService.logOut();
  }
}
