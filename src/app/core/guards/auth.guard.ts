import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, skip, tap, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import * as fromRootReducers from 'arvan/state/reducers';
import * as fromRootSelectors from 'arvan/state/selectors';
import * as fromRootActions from 'arvan/state/actions';
import { UnauthorizedUtilService } from '../unauthorized-util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private appSate: Store<fromRootReducers.AppState>,
    private unauthorizedUtilService: UnauthorizedUtilService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.appSate.dispatch(fromRootActions.getCurrentUser());

    return new Promise((resolve) => {
      const token = this.userService.token;

      if (token) {
        this.appSate
          .select(fromRootSelectors.getCurrentUser)
          .pipe(
            skip(1),
            tap((user) => {
              resolve(!!user);
            }),
            catchError((error) => {
              this.unauthorizedUtilService.redirectToLogin();

              resolve(false);

              return throwError(() => error);
            })
          )
          .subscribe();
      } else {
        this.unauthorizedUtilService.redirectToLogin();

        resolve(false);
      }
    });
  }
}
