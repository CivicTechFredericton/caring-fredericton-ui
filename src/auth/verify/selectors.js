import { FORM_NAME } from './constants';
import { getFormValues } from 'redux-form/immutable';

const formValuesSelector = getFormValues(FORM_NAME);

export const selectFormValues = state => {
  return formValuesSelector(state);
};

export const selectUserName = (state, props) =>
  decodeURIComponent(props.match.params.username);
