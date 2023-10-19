export class LoginService {
  private users: string[] = [];

  logUserIn(username: string, password: string) {
    this.users.push(username);
    this.users.push(password);
  }
}
