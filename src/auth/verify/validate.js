export default values => {
  const errors = {};

  if (!values.get('code')) {
    errors.code = 'verify:code_required';
  }

  return errors;
};
