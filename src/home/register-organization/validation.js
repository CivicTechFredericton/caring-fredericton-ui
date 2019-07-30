import { SimpleEmailRegex } from '../../utils/regex';

const validation = (t, values) => {
  let errors = {};

  if (!values.orgName) {
    errors.orgName = t('common.required');
  }

  if (!values.orgEmail) {
    errors.orgEmail = t('common.required');
  } else if (!SimpleEmailRegex.test(values.orgEmail)) {
    errors.orgEmail = t('error.invalidEmail');
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = t('common.required');
  }

  if (!values.street) {
    errors.street = t('common.required');
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
