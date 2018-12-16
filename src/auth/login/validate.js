export default values => {
  const errors = {};

  if (!values.get('username')) {
    errors.username = 'login:username_required';
  }

  if (!values.get('password')) {
    errors.password = 'login:password_required';
  }

  if (!values.get('newPassword')) {
    errors.newPassword = 'login:new_password_required';
  }

  if (!values.get('mfaCode')) {
    errors.mfaCode = 'login:mfa_code_required';
  }

  return errors;
};
