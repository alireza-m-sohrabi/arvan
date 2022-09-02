import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'arvan/config-provider.service';
import { Observable } from 'rxjs';
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
    return this.httpClient.post<User>(`${this.authEndPoint}/login`, {
      user: {
        email,
        password,
      },
    });
  }

  register(user: User) {
    return this.httpClient.post<User>(`${this.authEndPoint}`, {
      user,
    });
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.userEndPoint}`, {
      user,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.userEndPoint}`);
  }
}
