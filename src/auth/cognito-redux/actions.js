import { createRoutine } from 'utils/saga-utils';
import { createActions } from 'redux-actions';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const verify = createRoutine('VERIFY');
export const changePassword = createRoutine('CHANGE_PASSWORD');
export const forgotPassword = createRoutine('FORGOT_PASSWORD');
export const setPassword = createRoutine('SET_PASSWORD');

export const LOGOUT = 'LOGOUT';

export const { logout } = createActions(LOGOUT);
