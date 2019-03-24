import {
  validateOrgRegistration,
  validateEventRegistration,
} from './queryValidation';

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

function massageEvntData(evntDataObject) {
  const obj = {
    name: evntDataObject.name,
    description: 'API testing',
    categories: evntDataObject.categories,
    start_date: evntDataObject.start_date,
    end_date: evntDataObject.start_date,
    start_time: evntDataObject.start_time + ':00',
    end_time: evntDataObject.end_time + ':00',
    is_recurring: false,
  };

  return obj;
}

function verificationObj(reason) {
  const obj = {
    is_verified: true,
    reason: reason,
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
  const response = await fetch(url, requestData); //.then(vals =>
  // //  console.log(vals)
  // );
  return response;
}

export async function validateOrganization(token, orgId, reason) {
  const verificationData = verificationObj(reason);

  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url =
    'https://dev-api.caringfredericton.com/organizations/' + orgId + '/verify';

  const requestData = {
    headers,
    body: JSON.stringify(verificationData),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

export async function createEvent(token, orgId, event) {
  const massagedEvntData = massageEvntData(event);
  try {
    validateEventRegistration(massagedEvntData);
  } catch (error) {
    console.log(error);
    return null;
  }

  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url =
    'https://dev-api.caringfredericton.com/organizations/' + orgId + '/events';

  const requestData = {
    headers,
    body: JSON.stringify(massagedEvntData),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

export async function getEvent(token, start_date, end_date, categories) {
  let url = 'https://dev-api.caringfredericton.com/guest-view/events';
  let query;

  if (start_date) {
    query = 'start_time=' + encodeURIComponent(start_date);
  }

  if (end_date) {
    query = query + '&end_date=' + encodeURIComponent(end_date);
  }

  if (categories) {
    query = query + '';
  }

  if (query) {
    query = url + '?' + query;
  }

  console.log(query);
  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');

  //url = encodeURIComponent(url);

  const requestData = {
    headers,
    method: 'GET',
  };

  return await fetch(url, requestData).then(response => response.json());
}
