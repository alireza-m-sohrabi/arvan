import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './auth/auth.reducer';

export interface AppState {
  user: fromUser.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: fromUser.authReducer,
};

export const getUserFeature = createFeatureSelector<fromUser.AuthState>('user');

export * from './auth/auth.reducer';
