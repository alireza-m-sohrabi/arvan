import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'arvan/core/auth.service';
import { LoadingService } from 'arvan/core/loading/loading.service';
import { User } from 'arvan/core/user/user';
import { UserService } from 'arvan/core/user/user.service';
import {
  catchError,
  finalize,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      tap(() => this.loadingService.start()),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user) => {
            this.setUser(user);

            this.navigateToMainRout();

            return AuthActions.loginUserSuccess(user);
          }),
          catchError((error) => of(AuthActions.loginUserFail({ error }))),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUser),
        tap(() => {
          this.setUser(undefined);

          this.navigateToLogin();
        })
      ),
    { dispatch: false }
  );

  loginWithToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithToken),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => {
            this.setUser(user);

            return AuthActions.getCurrentUserSuccess(user);
          }),
          catchError((error) => {
            this.setUser(undefined);

            return of(AuthActions.getCurrentUserFail(error));
          })
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      tap(() => this.loadingService.start()),
      switchMap((formValue) =>
        this.authService.register(formValue).pipe(
          map((user) => {
            this.setUser(user);

            this.navigateToMainRout();

            return AuthActions.registerUserSuccess(user);
          }),
          catchError((error) => {
            this.setUser(undefined);

            return of(AuthActions.registerUserFail(error));
          }),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  throwErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginUserFail,
          AuthActions.registerUserFail,
          AuthActions.getCurrentUserFail
        ),
        switchMap((err) => throwError(() => err))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private loadingService: LoadingService,
    private userService: UserService,
    private router: Router
  ) {}

  private setUser(user: User | undefined) {
    if (user) {
      this.userService.user = user;
    } else {
      this.userService.user = undefined;
    }
  }

  private navigateToMainRout() {
    const searchParams = new URLSearchParams(window.location.search);
    const returnTo = searchParams.get('returnTo');
    let navigation = returnTo ? [returnTo] : [''];

    this.router.navigate(navigation);
  }

  private navigateToLogin() {
    const returnTo = window.location.pathname + window.location.search;

    this.router.navigate(['access', 'login'], {
      queryParams: { returnTo },
    });
  }
}
