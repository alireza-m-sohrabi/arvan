import { createAction, props } from '@ngrx/store';
import { User } from 'arvan/core/user/user';
import { ErrorProps } from '../models/state.models';

const prefix = '[Auth]';

export const setUser = createAction(`${prefix} Set`, props<User>());

export const loginUser = createAction(
  `${prefix} Login`,
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  `${prefix} Login Success`,
  props<User>()
);

export const loginUserFail = createAction(
  `${prefix} Login Fail`,
  props<ErrorProps<any>>()
);

export const getCurrentUser = createAction(`${prefix} Get Current User`);

export const getCurrentUserSuccess = createAction(
  `${prefix} Get Current User Success`,
  props<User>()
);

export const getCurrentUserFail = createAction(
  `${prefix} Get Current User Fail`,
  props<ErrorProps<any>>()
);

export const logoutUser = createAction(`${prefix} Logout`);

export const registerUser = createAction(`${prefix} Register`, props<User>());

export const registerUserSuccess = createAction(
  `${prefix} Register Success`,
  props<User>()
);

export const registerUserFail = createAction(
  `${prefix} Register Fail`,
  props<User>()
);
