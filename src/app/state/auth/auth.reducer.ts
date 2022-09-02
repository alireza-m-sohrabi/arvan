import { createReducer, on } from '@ngrx/store';
import { User } from 'arvan/core/user/user';
import { ErrorProps } from '../models/state.models';
import * as AuthActions from './auth.actions';

export interface AuthState extends ErrorProps<any> {
  isAuthenticated: boolean;
  user?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginUserSuccess, (state, user) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(AuthActions.loginUserFail, (state, error) => ({ ...state, error })),
  on(AuthActions.logoutUser, () => ({
    isAuthenticated: false,
    user: undefined,
    error: undefined,
  })),
  on(AuthActions.getCurrentUserSuccess, (state, user) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: undefined,
  })),
  on(AuthActions.getCurrentUserFail, (state, error) => ({
    user: undefined,
    isAuthenticated: false,
    error,
  }))
);
