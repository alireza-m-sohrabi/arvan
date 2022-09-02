import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'arvan/core/auth.service';
import { LoadingService } from 'arvan/core/loading/loading.service';
import { User } from 'arvan/core/user/user';
import { UserService } from 'arvan/core/user/user.service';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      tap(() => this.loadingService.start()),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user) => AuthActions.loginUserSuccess(user)),
          catchError((error) => of(AuthActions.loginUserFail({ error }))),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap((user) => {
          this.setUser(user);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUser),
        tap(() => {
          this.setUser(undefined);
        })
      ),
    { dispatch: false }
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUser),
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private loadingService: LoadingService,
    private userService: UserService
  ) {}

  private setUser(user: User | undefined) {
    if (user) {
      this.userService.user = user;
      this.userService.token = user.token;
    } else {
      this.userService.user = undefined;
      this.userService.token = undefined;
    }
  }
}
