import { verify } from 'auth/cognito-redux/actions';
import { takeLatest, put } from 'redux-saga/effects';
import { change } from 'redux-form/immutable';
import { FORM_NAME } from './constants';
import history from '../../routes/history';

function* onVerifyFail({ payload }) {
  const { errors } = payload;
  yield put(change(FORM_NAME, 'session', errors._error.session));
}

function onVerifySuccess() {
  history.push('/login');
}

export default function*() {
  yield takeLatest(verify.SUCCESS, onVerifySuccess);
  yield takeLatest(verify.FAILURE, onVerifyFail);
}
