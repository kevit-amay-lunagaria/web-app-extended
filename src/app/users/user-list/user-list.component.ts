import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  contentLoaded: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.contentLoaded = false;
    setTimeout(() => {
      this.userService.fetchUsers().subscribe((res: any) => {
        this.contentLoaded = true;
        this.users = res;
      });
    }, 1500);
  }

  getUserDetail() {
    this.userService.getUserDetail();
  }

  deleteUser(index: number) {
    alert('user id: ' + this.users[index].id + ' deleted');
    this.userService.deleteUser(index);
    this.fetchUsers();
  }
}
