import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  get user(): User | undefined {
    try {
      return JSON.parse(sessionStorage.getItem('arvanUser')!) as User;
    } catch (error) {
      return undefined;
    }
  }

  set user(value: User | undefined) {
    if (value) {
      sessionStorage.setItem('arvanUser', JSON.stringify(value));
    } else {
      sessionStorage.removeItem('arvanUser');
    }
  }
}
