import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'arvan/config-provider.service';
import { map, Observable } from 'rxjs';
import { User } from './user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEndPoint: string;
  private userEndPoint: string;

  constructor(private config: ConfigService, private httpClient: HttpClient) {
    this.authEndPoint = `${this.config.environment?.api.core}/users`;
    this.userEndPoint = `${this.config.environment?.api.core}/user`;
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<any>(`${this.authEndPoint}/login`, {
        user: {
          email,
          password,
        },
      })
      .pipe(map((result) => result.user));
  }

  register(user: User) {
    return this.httpClient
      .post<any>(`${this.authEndPoint}`, {
        user,
      })
      .pipe(map((result) => result.user));
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.userEndPoint}`, {
      user,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<any>(`${this.userEndPoint}`)
      .pipe(map((result) => result.user));
  }
}
