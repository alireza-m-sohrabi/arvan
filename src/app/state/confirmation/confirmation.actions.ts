import { createAction, props } from '@ngrx/store';
import { ConfirmationProps } from './confirmation.model';

export const openConfirmationDialog = createAction(
  '[Confirmation] Open Dialog',
  props<ConfirmationProps>()
);
