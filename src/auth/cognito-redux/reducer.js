import { handleActions } from 'redux-actions';
import { login, LOGOUT } from './actions';
import { Map, fromJS } from 'immutable';
import { ERRORS } from './constants';

export const REDUCER_NAME = 'cognito';

export default handleActions(
  {
    [login.SUCCESS]: (state, { payload }) =>
      state
        .set('user', payload)
        .remove('loginErrors')
        .remove('mfa'),
    [login.FAILURE]: (state, { payload }) =>
      state.update('loginErrors', (errors = Map()) => {
        const { code, attributesRequired, session } = payload.errors._error;

        return errors
          .set(
            'mfaRequired',
            code === ERRORS.MFARequired ? fromJS({ session }) : null
          )
          .set(
            'attributesRequired',
            code === ERRORS.AttributesRequired
              ? fromJS(attributesRequired)
              : null
          )
          .set('newPasswordRequired', code === ERRORS.NewPasswordRequired);
      }),
    [LOGOUT]: (state, { payload }) => {
      payload.signOut();
      return state.remove('user');
    },
  },
  Map()
);
