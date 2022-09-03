import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './auth/auth.reducer';

export interface AppState {
  auth: fromUser.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: fromUser.authReducer,
};

export const getAuthFeature = createFeatureSelector<fromUser.AuthState>('auth');

export * from './auth/auth.reducer';
