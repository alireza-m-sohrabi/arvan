import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  get user(): User {
    const user = JSON.parse(this.cookieService.get('user')) as User;

    return user;
  }

  set user(value: User | undefined) {
    if (value) {
      this.cookieService.set('user', JSON.stringify(value), {
        expires: Number.MAX_VALUE,
        domain: '/',
      });
    } else {
      this.cookieService.deleteAll('token', '/');
    }
  }

  get token() {
    return this.cookieService.get('token');
  }

  set token(value: string | undefined) {
    if (value) {
      this.cookieService.set('token', value, {
        expires: Number.MAX_VALUE,
        domain: '/',
      });
    } else {
      this.cookieService.deleteAll('token', '/');
    }
  }
}
