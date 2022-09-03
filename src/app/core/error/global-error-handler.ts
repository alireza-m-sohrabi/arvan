import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}

  handleError(error: any): void {
    this.errorService.handleError(error);
  }
}

export const globalErrorHandlerProvider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
  deps: [ErrorService],
};
