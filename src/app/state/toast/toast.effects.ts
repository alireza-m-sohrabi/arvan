import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as ToastActions from './toast.actions';

@Injectable()
export class ToastEffects {
  showSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.showSuccessToast),
        tap((action) => this.toaster.success(action.message, action.title)),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  showErrorToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.showErrorToast),
        tap((action) => this.toaster.error(action.message, action.title)),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  showWarningToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.showWarningToast),
        tap((action) => this.toaster.warning(action.message, action.title)),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  showInfoToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.showInfoToast),
        tap((action) => this.toaster.info(action.message, action.title)),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private toaster: ToastrService) {}
}
