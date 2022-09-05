import { createReducer, on } from '@ngrx/store';
import { User } from 'arvan/core/user/user';
import { ErrorProps } from '../models/state.models';
import * as AuthActions from './auth.actions';

export interface AuthState extends ErrorProps<any> {
  isAuthenticated: boolean;
  user?: User;
  waiting?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  error: null,
  waiting: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state) => ({
    ...state,
    waiting: true,
  })),
  on(AuthActions.loginUserSuccess, (state, user) => ({
    ...state,
    isAuthenticated: true,
    user,
    waiting: false,
  })),
  on(AuthActions.loginUserFail, (state, error) => ({
    ...state,
    error,
    waiting: false,
  })),
  on(AuthActions.logoutUser, (state) => ({
    ...state,
    isAuthenticated: false,
    user: undefined,
    error: undefined,
  })),
  on(AuthActions.setCurrentUser, (state, user) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: undefined,
  })),
  on(AuthActions.registerUser, (state) => ({
    ...state,
    waiting: true,
  })),
  on(AuthActions.registerUserSuccess, (state, user) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: undefined,
    waiting: false,
  })),
  on(AuthActions.registerUserFail, (state, error) => ({
    user: undefined,
    isAuthenticated: false,
    error,
    waiting: false,
  }))
);
