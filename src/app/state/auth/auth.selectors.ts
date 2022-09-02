import { createSelector } from '@ngrx/store';
import { getUserFeature, AuthState } from '../reducers';

export const getCurrentUser = createSelector(
  getUserFeature,
  (state: AuthState) => state.user
);
