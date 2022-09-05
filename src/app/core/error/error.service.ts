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

    const errorModel = response.error?.errors || response.error?.error?.errors;

    if (!!errorModel) {
      errorMessage = '';

      for (let key in errorModel) {
        errorMessage += '\n' + key + ' ' + errorModel[key];
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
