import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent
  implements OnInit, CanComponentDeactivate, OnDestroy
{
  genders: string[] = ['Male', 'Female'];
  hobbies: any[] = [
    { name: 'Cricket' },
    { name: 'Gaming' },
    { name: 'Reading' },
  ];
  userForm: any;
  selectedHobbies: string[] = [];
  allowEdit: boolean = false;
  dataFromEditForm: object[] = [];
  formSubmitted: boolean = false;
  checkBoxChecked: boolean = false;
  uIndex: number = 0;
  userSub: Subscription | undefined;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((qParams: any) => {
      if (qParams.edit !== undefined) {
        this.allowEdit = qParams.edit;
        this.uIndex = qParams.id;
      }
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let dob = '';
    let email = '';
    let phonenumber = '';
    let institute = '';
    let educationtype = '';
    let percentage = '';
    let address = '';
    let summary = '';
    let gender = '';
    let cric = false;
    let gaming = false;
    let reading = false;

    if (this.allowEdit) {
      let user: any;
      this.userSub = this.userService.getUserDetail().subscribe((data: any) => {
        user = data[this.uIndex];
        if (user === undefined) {
          alert('user not found :(');
          alert('Redirecting back to the user list');
          this.router.navigate(['/user-list']);
        } else {
          this.editUser(user);
        }
      });
    }
    this.userForm = new FormGroup({
      name: new FormControl(name, [Validators.required, this.noSpace]),
      dob: new FormControl(dob, [Validators.required]),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      phonenumber: new FormControl(phonenumber, [Validators.required]),
      education: new FormGroup({
        institute: new FormControl(institute, [Validators.required]),
        educationtype: new FormControl(educationtype, [Validators.required]),
        percentage: new FormControl(percentage, [
          Validators.required,
          this.percentLength,
        ]),
      }),
      Cricket: new FormControl(cric, []),
      Gaming: new FormControl(gaming, []),
      Reading: new FormControl(reading, []),
      gender: new FormControl(gender, [Validators.required]),
      address: new FormControl(address, []),
      summary: new FormControl(summary, []),
    });
  }

  editUser(dataFromEditForm: any) {
    let name = '';
    let dob = '';
    let email = '';
    let phonenumber = '';
    let institute = '';
    let educationtype = '';
    let percentage = '';
    let address = '';
    let summary = '';
    let gender = '';
    let cric = false;
    let gaming = false;
    let reading = false;

    name = dataFromEditForm.name;
    dob = dataFromEditForm.dob;
    email = dataFromEditForm.email;
    phonenumber = dataFromEditForm.phonenumber;
    institute = dataFromEditForm.education.institute;
    educationtype = dataFromEditForm.education.educationtype;
    percentage = dataFromEditForm.education.percentage;
    gender = dataFromEditForm.gender;
    address = dataFromEditForm.address;
    summary = dataFromEditForm.summary;
    cric = dataFromEditForm.Cricket;
    gaming = dataFromEditForm.Gaming;
    reading = dataFromEditForm.Reading;
    this.userId = dataFromEditForm.id;

    this.userForm = new FormGroup({
      name: new FormControl(name, [Validators.required, this.noSpace]),
      dob: new FormControl(dob, [Validators.required]),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      phonenumber: new FormControl(phonenumber, [Validators.required]),
      education: new FormGroup({
        institute: new FormControl(institute, [Validators.required]),
        educationtype: new FormControl(educationtype, [Validators.required]),
        percentage: new FormControl(percentage, [
          Validators.required,
          this.percentLength,
        ]),
      }),
      Cricket: new FormControl(cric, []),
      Gaming: new FormControl(gaming, []),
      Reading: new FormControl(reading, []),
      gender: new FormControl(gender, [Validators.required]),
      address: new FormControl(address, []),
      summary: new FormControl(summary, []),
    });
  }

  percentLength(control: FormControl): { [s: string]: boolean } | null {
    if (
      (control.value != null &&
        (control.value.toString().length > 5 ||
          control.value.toString().length < 2)) ||
      control.value?.toString().indexOf('.') < 1 ||
      control.value?.toString().indexOf('.') > 2
    ) {
      return { noProperFormat: true };
    }
    return null;
  }

  noSpace(control: FormControl): { [s: string]: boolean } | null {
    if (control.value != null && control.value.indexOf(' ') !== -1) {
      return { noWhiteSpace: true };
    }
    return null;
  }

  onCancel() {
    if (this.allowEdit) {
      this.router.navigate(['/user-detail', this.uIndex], {
        relativeTo: this.route,
      });
    } else {
      this.userForm.reset();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.formSubmitted = true;
      if (this.allowEdit) {
        this.userService.updatedUser(this.userForm.value, this.userId);
        this.router.navigate(['/user-detail', this.uIndex]);
      } else {
        this.userService.addNewUser(this.userForm.value);
        this.router.navigate(['/user-list'], { relativeTo: this.route });
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleReload($event: any) {
    return ($event.returnValue = 'Your changes will not be saved');
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if (this.allowEdit && !this.formSubmitted) {
      this.formSubmitted = false;
      return confirm('Are you sure, you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
