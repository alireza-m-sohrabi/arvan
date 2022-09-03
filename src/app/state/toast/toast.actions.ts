import { createAction, props } from '@ngrx/store';
import { ToastProps } from './toast.model';

const prefix = '[Toast]';

export const showSuccessToast = createAction(
  `${prefix} Success`,
  props<ToastProps>()
);
export const showErrorToast = createAction(
  `${prefix} Error`,
  props<ToastProps>()
);
export const showWarningToast = createAction(
  `${prefix} Warning`,
  props<ToastProps>()
);
export const showInfoToast = createAction(
  `${prefix} Info`,
  props<ToastProps>()
);
