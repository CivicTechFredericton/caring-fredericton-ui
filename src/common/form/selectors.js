import { getFormValues } from 'redux-form/immutable';

export const selectFormValues = (state, { form }) => {
  return getFormValues(form)(state);
};
