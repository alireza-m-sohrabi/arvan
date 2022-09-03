import { createSelector } from '@ngrx/store';
import { getAuthFeature, AuthState } from '../reducers';

export const selectCurrentUser = createSelector(
  getAuthFeature,
  (state: AuthState) => state.user
);

export const selectAuthWaiting = createSelector(
  getAuthFeature,
  (state: AuthState) => state.waiting
);

export const selectIsAuthenticated = createSelector(
  getAuthFeature,
  (state: AuthState) => state.isAuthenticated
);
