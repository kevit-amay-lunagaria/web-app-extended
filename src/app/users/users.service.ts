import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: any;
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get(this.url);
  }

  getUserDetail() {
    return this.http.get(this.url).pipe(
      tap((res) => {
        this.users = res;
      })
    );
  }

  addNewUser(userData: any) {
    this.http.post(this.url, userData).subscribe((res) => {
      console.log(res);
    });
  }

  updatedUser(userData: any, id: number) {
    this.http.put(this.url + '/' + id, userData).subscribe((res) => {
      console.log(res);
    });
  }

  deleteUser(index: number) {
    this.http.delete(this.url + '/' + index).subscribe((res) => {
      console.log(res);
    });
  }
}
