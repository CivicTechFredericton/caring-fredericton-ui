export const forgotPasswordValidate = values => {
  const errors = {};

  if (!values.get('username')) {
    errors.username = 'forgotPassword:Username required';
  }

  return errors;
};

export const setPasswordValidate = values => {
  const errors = {};

  if (!values.get('verificationCode')) {
    errors.verificationCode = 'forgotPassword:Verification Code Required';
  }

  if (!values.get('password')) {
    errors.password = 'forgotPassword:Password Required';
  }

  if (!values.get('confirmPassword')) {
    errors.confirmPassword = 'forgotPasssword:Must confirm password';
  }

  if (values.get('confirmPassword') !== values.get('password')) {
    errors.confirmPassword = 'forgotPasssword:Password does not match';
  }

  return errors;
};
