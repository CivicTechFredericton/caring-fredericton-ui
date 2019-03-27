import { SimpleEmailRegex } from 'Utils/regex';

const validation = (t, values) => {
  let errors = {};

  if (!values.orgName) {
    errors.orgName = t('common.required');
  }

  if (!values.email) {
    errors.email = t('common.required');
  } else if (!SimpleEmailRegex.test(values.email)) {
    errors.email = t('error.invalidEmail');
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = t('common.required');
  }

  if (!values.address) {
    errors.address = t('common.required');
  }

  if (!values.city) {
    errors.city = t('common.required');
  }

  if (!values.province) {
    errors.province = t('common.required');
  }

  if (!values.postalCode) {
    errors.postalCode = t('common.required');
  }

  return errors;
};

export default validation;
