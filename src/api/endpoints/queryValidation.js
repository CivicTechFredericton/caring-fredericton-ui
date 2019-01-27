// Basic validation for API call data.
export function validateOrgRegistration(orgDataObject) {
  if (!orgDataObject)
    throw new ReferenceError(
      'orgDataObject is falsy -- ensure that it matches registration specification'
    );

  if (!orgDataObject['name'])
    throw new ReferenceError('name is a required field');

  if (!orgDataObject['email'])
    throw new ReferenceError('email is a required field');

  if (!orgDataObject['phone'])
    throw new ReferenceError('phone is a required field');

  if (!orgDataObject['administrator'])
    throw new ReferenceError('administrator is a required field');

  if (!orgDataObject['address'])
    throw new ReferenceError('address is a required field');
}
