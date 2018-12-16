import { FORM_NAME } from './constants';
import { getFormValues } from 'redux-form/immutable';

const formValuesSelector = getFormValues(FORM_NAME);

export const selectFormValues = state => {
  return formValuesSelector(state);
};
