import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'arvan/state';
import { ArvanError } from './error-model';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private rootStore: Store<fromRoot.AppState>) {}

  handleError(response: HttpErrorResponse) {
    let errorMessage = response.error?.message;

    console.error(errorMessage);

    if (!!response.error?.error?.errors) {
      errorMessage = '';

      const errorModel = response.error.error as ArvanError;

      if (errorModel) {
        for (let key in errorModel.errors) {
          errorMessage += '\n' + key + ' ' + errorModel.errors[key];
        }
      }
    }

    this.rootStore.dispatch(
      fromRoot.showErrorToast({
        message: errorMessage,
        title: 'Error!',
      })
    );
  }
}
