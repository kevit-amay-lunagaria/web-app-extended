import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  hobbies: string[] = [];
  userData: any;
  showPercentSymbol: boolean = false;
  allowEdit: boolean = false;
  closeDetail: boolean = false;
  private subscription: Subscription | undefined;
  formEdited: boolean = false;
  name: string = '';
  dob: any;
  email: string = '';
  phonenumber: number = 0;
  institute: string = '';
  educationtype: string = '';
  percent: number = 0;
  gender: string = '';
  address: string = '';
  summary: string = '';
  userIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      this.userIndex = param.id;
    });
    this.getUserData();
    this.closeDetail = true;
  }

  getUserData() {
    this.userService.getUserDetail().subscribe((res: any) => {
      this.userData = res[this.userIndex];
      if (this.userData === undefined) {
        alert('user not found :(');
        alert('Redirecting back');
        this.router.navigate(['/user-list']);
      } else {
        this.closeDetail = false;
        this.assignData(this.userData);
      }
    });
  }

  assignData(userData: any) {
    if (
      userData.education.percentage.toString().indexOf('.') === 2 ||
      (userData.education.percentage.toString().length <= 2 &&
        userData.education.percentage.toString().indexOf('0') != 0)
    ) {
      this.showPercentSymbol = true;
    } else {
      this.showPercentSymbol = false;
    }
    this.name = userData.name;
    this.dob = userData.dob;
    this.email = userData.email;
    this.phonenumber = userData.phonenumber;
    this.institute = userData.education.institute;
    this.educationtype = userData.education.educationtype;
    this.percent = userData.education.percentage;
    this.gender = userData.gender;
    this.address = userData.address;
    this.summary = userData.summary;

    if (userData.Cricket) {
      this.hobbies.push('Cricket');
    }
    if (userData.Gaming) {
      this.hobbies.push('Gaming');
    }
    if (userData.Reading) {
      this.hobbies.push('Reading');
    }
  }

  toEdit() {
    this.allowEdit = true;
    const queryParams = {
      edit: this.allowEdit,
      id: this.userIndex,
    };

    this.router.navigate(['/user'], { queryParams: queryParams });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
