import { login, register, verify, changePassword, forgotPassword, setPassword } from './actions';
import { authorize, signUp, verifyUser, changeUserPassword, forgotUserPassword, setUserPassword } from './api';
import { takeLatestRoutine } from 'utils/saga-utils';
import { SubmissionError } from 'redux-form/immutable'


function* handleAction(myAction, {payload}) {
  try {
    return yield myAction(payload.toJS());
  } catch (e) {
    throw new SubmissionError({ _error: e });
  }
}

export default function* () {
  yield takeLatestRoutine(login, handleAction.bind(this, authorize));
  yield takeLatestRoutine(register, handleAction.bind(this, signUp));
  yield takeLatestRoutine(verify, handleAction.bind(this, verifyUser));
  yield takeLatestRoutine(changePassword, handleAction.bind(this, changeUserPassword));
  yield takeLatestRoutine(forgotPassword, handleAction.bind(this, forgotUserPassword));
  yield takeLatestRoutine(setPassword, handleAction.bind(this, setUserPassword));
}
