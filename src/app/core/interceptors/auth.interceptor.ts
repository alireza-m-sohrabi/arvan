import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UnauthorizedUtilService } from '../unauthorized-util.service';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private unauthorizedUtilService: UnauthorizedUtilService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: any = { 'Content-Type': 'application/json' };
    const token = this.userService.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const authReq = req.clone({
      setHeaders: headers,
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.Unauthorized
        ) {
          this.unauthorizedUtilService.redirectToLogin();
        }

        return throwError(() => error);
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
