import { changePassword } from 'auth/cognito-redux/actions';
import { takeLatest, put } from 'redux-saga/effects';
import { change } from 'redux-form/immutable';
import { FORM_NAME } from './constants';
import history from 'routes/history';

function* onChangePasswordFail({ payload }) {
  const { errors } = payload;
  yield put(change(FORM_NAME, 'session', errors._error.session));
}

function onChangePasswordSuccess() {
  history.push('/');
}

export default function*() {
  yield takeLatest(changePassword.SUCCESS, onChangePasswordSuccess);
  yield takeLatest(changePassword.FAILURE, onChangePasswordFail);
}
