import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { UserService } from '../user/user.service';
import * as fromRootReducers from 'arvan/state/reducers';
import * as fromRootSelectors from 'arvan/state/selectors';
import * as fromRootActions from 'arvan/state/actions';
import { UnauthorizedUtilService } from '../unauthorized-util.service';
import { ConfigService } from 'arvan/config-provider.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private appStore: Store<fromRootReducers.AppState>,
    private unauthorizedUtilService: UnauthorizedUtilService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.configService.isInit.pipe(
      filter((value) => !!value),
      withLatestFrom(
        this.appStore.select(fromRootSelectors.selectIsAuthenticated)
      ),
      switchMap(([_, isAuthenticated]) => {
        const token = this.userService.user?.token;

        if (isAuthenticated && token) {
          return of(true);
        }

        if (!isAuthenticated && token) {
          return this.authService.getCurrentUser().pipe(
            map((user) => {
              this.appStore.dispatch(fromRootActions.setCurrentUser(user));

              return true;
            }),
            catchError((error) => {
              this.unauthorizedUtilService.redirectToLogin();

              return throwError(() => error);
            })
          );
        }

        this.unauthorizedUtilService.redirectToLogin();

        return of(false);
      })
    );
  }
}
