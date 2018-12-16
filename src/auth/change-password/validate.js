export default values => {
  const errors = {};

  if (!values.get('oldPassword')) {
    errors.oldPassword = 'change-password:Old Password is required';
  }

  if (!values.get('newPassword')) {
    errors.newPassword = 'change-password:New Password is required';
  }

  if (!values.get('confirmPassword')) {
    errors.confirmPassword = 'change-password:Must confirm password';
  }

  if (values.get('confirmPassword') !== values.get('newPassword')) {
    errors.confirmPassword = 'change-password:Password does not match';
  }

  return errors;
};
