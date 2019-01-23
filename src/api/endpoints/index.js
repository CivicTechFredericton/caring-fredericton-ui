import { validateOrgRegistration } from './queryValidation';

function massageOrgRegistration(orgDataObject) {
  const obj = {
    name: orgDataObject.orgName,
    description: 'API testing',
    email: orgDataObject.email,
    phone: orgDataObject.phoneNumber,
    administrator: {
      first_name: orgDataObject.adminFirstName,
      last_name: orgDataObject.adminLastName,
      email: orgDataObject.adminEmail,
    },
    address: {
      street: orgDataObject.address,
      postal_code: orgDataObject.postalCode,
      city: orgDataObject.city,
      province: orgDataObject.province,
      country: 'Canada',
    },
  };
  return obj;
}

export async function registerOrganization(orgDataObject) {
  const massagedOrgData = massageOrgRegistration(orgDataObject);
  try {
    validateOrgRegistration(massagedOrgData);
  } catch (error) {
    console.log(error);
    return null;
  }

  const url = 'https://dev-api.caringfredericton.com/register-organization';
  const requestData = {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(massagedOrgData),
    method: 'POST',
  };
  const response = await fetch(url, requestData).then(vals =>
    console.log(vals)
  );
  return response;
}
