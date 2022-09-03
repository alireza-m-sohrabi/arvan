import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  get user(): User | undefined {
    try {
      return JSON.parse(this.cookieService.get('arvanUser')) as User;
    } catch (error) {
      return undefined;
    }
  }

  set user(value: User | undefined) {
    if (value) {
      this.cookieService.set('arvanUser', JSON.stringify(value));
    } else {
      this.cookieService.deleteAll('arvanUser');
    }
  }
}
