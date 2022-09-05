import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfirmationDialogService } from 'arvan/core/confirmation/confirmation-dialog.service';
import { EMPTY, map } from 'rxjs';
import * as fromConfirmation from './confirmation.actions';

@Injectable({ providedIn: 'root' })
export class ConfirmationEffects {
  openDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromConfirmation.openConfirmationDialog),
        map(({ title, message, config }) => {
          this.confirmationService.confirm(title, message, config);

          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private confirmationService: ConfirmationDialogService
  ) {}
}
