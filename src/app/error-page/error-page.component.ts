import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    alert(
      'Looks like you are lost :) \n Redirecting to login page in a second!'
    );
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
