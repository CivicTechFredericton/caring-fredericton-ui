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

// Basic validation for API call data.
export function validateEventRegistration(evtDataObject) {
  console.log(evtDataObject);
  if (!evtDataObject)
    throw new ReferenceError(
      'event is falsy -- ensure that it matches registration specification'
    );

  if (!evtDataObject['name'])
    throw new ReferenceError('name is a required field');

  if (!evtDataObject['description'])
    throw new ReferenceError('description is a required field');

  if (!evtDataObject['categories'])
    throw new ReferenceError('categories is a required field');

  if (!evtDataObject['start_date'])
    throw new ReferenceError('start_date is a required field');

  if (!evtDataObject['end_date'])
    throw new ReferenceError('end_date is a required field');

  if (!evtDataObject['end_time'])
    throw new ReferenceError('end_time is a required field');

  if (!evtDataObject['start_time'])
    throw new ReferenceError('start_time is a required field');
}
