import { Component, Injectable, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
@Injectable()
export class LoginComponent {
  @ViewChild('f', { static: false }) loginForm: any;
  username: string = '';
  userpassword: string = '';
  checkForm: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.loginForm?.valid) {
      this.checkForm = true;
    }
  }

  onLogIn() {
    if (this.loginForm?.valid) {
      this.loginService.logUserIn(
        this.loginForm?.value.username,
        this.loginForm?.value.userpassword
      );
      alert('You have logged in!!');
      this.authService.logIn();
      this.router.navigate(['/user-list'], { relativeTo: this.route });
    } else {
      alert('Please submit valid details!!');
    }
  }
}
