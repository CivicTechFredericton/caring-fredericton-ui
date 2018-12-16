export default values => {
  const errors = {};

  if (!values.get('username')) {
    errors.username = 'register:username_required';
  }

  if (!values.get('password')) {
    errors.password = 'register:password_required';
  }

  if (!values.get('confirmPassword')) {
    errors.confirmPassword = 'register:confirm_password_required';
  }

  if (values.get('confirmPassword') !== values.get('password')) {
    errors.confirmPassword = 'register:password_mismatch';
  }

  return errors;
};
