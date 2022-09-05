import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}

  handleError(error: any): void {
    if (error.name === 'HttpErrorResponse') {
      this.errorService.handleError(error);
    } else {
      console.error({ error });
    }
  }
}

export const globalErrorHandlerProvider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
  deps: [ErrorService],
};
