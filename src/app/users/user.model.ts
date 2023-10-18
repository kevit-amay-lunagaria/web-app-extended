import { Education } from './education.model';

export class User {
  constructor(
    public name: string,
    public email: string,
    public dob: Date,
    public phonenumber: number,
    public education: Education,
    public Cricket: boolean,
    public Gaming: boolean,
    public Reading: boolean,
    public gender: string,
    public address: string,
    public summary: string
  ) {}
}
