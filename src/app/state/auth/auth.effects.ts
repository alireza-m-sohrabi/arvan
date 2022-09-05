import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'arvan/core/auth.service';
import { LoadingService } from 'arvan/core/loading/loading.service';
import { UnauthorizedUtilService } from 'arvan/core/unauthorized-util.service';
import { User } from 'arvan/core/user/user';
import { UserService } from 'arvan/core/user/user.service';
import {
  catchError,
  EMPTY,
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

            this.navigateToMainRoute();

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
        map(() => {
          this.setUser(undefined);

          this.unauthorizedUtilService.redirectToLogin();

          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  setCurrentUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setCurrentUser),
        map((user) => {
          this.setUser(user);

          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      tap(() => this.loadingService.start()),
      switchMap((formValue) =>
        this.authService.register(formValue).pipe(
          map((user) => {
            this.setUser(user);

            this.navigateToMainRoute();

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
        ofType(AuthActions.loginUserFail, AuthActions.registerUserFail),
        switchMap((err) => throwError(() => err))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private loadingService: LoadingService,
    private userService: UserService,
    private router: Router,
    private unauthorizedUtilService: UnauthorizedUtilService
  ) {}

  private setUser(user: User | undefined) {
    if (user) {
      this.userService.user = user;
    } else {
      this.userService.user = undefined;
    }
  }

  private navigateToMainRoute() {
    this.router.navigate(['']);
  }
}
