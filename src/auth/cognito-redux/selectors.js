import { REDUCER_NAME } from './reducer';
import { createSelector } from 'reselect';
import { Map } from 'immutable';

const selectReducer = state => state.get(REDUCER_NAME);

export const selectUser = createSelector(
  [selectReducer],
  reducer => reducer.get('user', null)
);

const selectLoginErrors = createSelector(
  [selectReducer],
  reducer => reducer.get('loginErrors', Map())
);

export const selectNewPasswordRequired = createSelector(
  [selectLoginErrors],
  errors => errors.get('newPasswordRequired')
);

export const selectAttributesRequired = createSelector(
  [selectLoginErrors],
  errors => errors.get('attributesRequired')
);

export const selectMFARequired = createSelector(
  [selectLoginErrors],
  errors => errors.get('mfaRequired')
);
