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
  skip,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { UserService } from '../user/user.service';
import * as fromRootReducers from 'arvan/state/reducers';
import * as fromRootSelectors from 'arvan/state/selectors';
import * as fromRootActions from 'arvan/state/actions';
import { UnauthorizedUtilService } from '../unauthorized-util.service';
import { ConfigService } from 'arvan/config-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private appStore: Store<fromRootReducers.AppState>,
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
    return new Promise((resolve) => {
      this.configService.isInit
        .pipe(
          filter((value) => !!value),
          switchMap(() =>
            this.appStore.select(fromRootSelectors.selectIsAuthenticated).pipe(
              tap((isAuthenticated) => {
                const token = this.userService.user?.token;

                if (isAuthenticated && token) {
                  resolve(true);

                  return;
                }

                if (!isAuthenticated && token) {
                  this.appStore.dispatch(fromRootActions.loginWithToken());

                  this.appStore
                    .select(fromRootSelectors.selectCurrentUser)
                    .pipe(
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
              })
            )
          )
        )
        .subscribe();
    });
  }
}
