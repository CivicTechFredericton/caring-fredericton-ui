import { forgotPassword, setPassword } from 'auth/cognito-redux/actions';
import { takeLatest, put } from 'redux-saga/effects';
import { change } from 'redux-form/immutable';
import { FORGOT_PASSWORD_FORM_NAME, SET_PASSWORD_FORM_NAME } from './constants';
import history from 'routes/history';

function* onForgotPasswordFail({ payload }) {
  const { errors } = payload;
  yield put(
    change(FORGOT_PASSWORD_FORM_NAME, 'session', errors._error.session)
  );
}

function onForgotPasswordSuccess({ payload }) {
  history.push(`/${encodeURIComponent(payload)}/set-password`);
}

function* onSetPasswordFail({ payload }) {
  const { errors } = payload;
  yield put(change(SET_PASSWORD_FORM_NAME, 'session', errors._error.session));
}

function onSetPasswordSuccess() {
  history.push('/login');
}

export default function*() {
  yield takeLatest(forgotPassword.SUCCESS, onForgotPasswordSuccess);
  yield takeLatest(forgotPassword.FAILURE, onForgotPasswordFail);
  yield takeLatest(setPassword.SUCCESS, onSetPasswordSuccess);
  yield takeLatest(setPassword.FAILURE, onSetPasswordFail);
}
