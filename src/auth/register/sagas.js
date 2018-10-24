import { register } from 'auth/cognito-redux/actions';
import { takeLatest, put } from 'redux-saga/effects'
import { change } from 'redux-form/immutable';
import { FORM_NAME } from './constants';
import history from '../../routes/history';

function* onRegisterFail({ payload }) {
  const { errors } = payload;
  yield put(change(FORM_NAME, 'session', errors._error.session));

}

function onRegisterSuccess({ payload }) {
  history.push(`/${encodeURIComponent(payload.user.username)}/verify`);
}

export default function* () {
  yield takeLatest(register.SUCCESS, onRegisterSuccess);
  yield takeLatest(register.FAILURE, onRegisterFail);
}
