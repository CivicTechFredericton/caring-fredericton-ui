import { awsApiRequest } from '../../utils/func';
import { getEnvVariable } from '../../utils/environmentVariables';
const BASE_API_URL = getEnvVariable('REACT_APP_API_URL');

/**
 * Guest user endpoints
 */
export async function listEventsForGuestUser(
  start_date,
  end_date,
  categoriesArray
) {
  let url = new URL(BASE_API_URL + '/guests/events');
  const categories = categoriesArray.join(',');
  url.search = new URLSearchParams({ start_date, end_date, categories });

  const headers = new Headers();
  headers.append('content-type', 'application/json');

  const requestData = {
    headers,
    method: 'GET',
  };

  return await fetch(url, requestData).then(response => response.json());
}

export async function listRegisteredOrganizations() {
  let url = BASE_API_URL + '/guests/organizations';

  const headers = new Headers();
  headers.append('content-type', 'application/json');

  const requestData = {
    headers,
    method: 'GET',
  };

  return await fetch(url, requestData).then(response => response.json());
}

/**
 * User endpoints
 */
export async function createUser(userParams) {
  try {
    return await awsApiRequest({
      method: 'POST',
      path: '/users/signup',
      params: {
        body: userParams,
      },
    });
  } catch (error) {
    return error;
  }
}

/*export async function createUser(user) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const url = BASE_API_URL + '/users/signup';

  const requestData = {
    headers,
    body: JSON.stringify(user),
    method: 'POST',
  };

  return await fetch(url, requestData);
}*/

export async function getUserDetails(userId) {
  try {
    return await awsApiRequest({
      method: 'GET',
      path: `/users/${userId}`,
    });
  } catch (error) {
    return error;
  }
}

/**
 * Organization endpoints
 */
export async function getOrganizatonDetails(token, orgId) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('Authorization', token.jwtToken);
  const url = BASE_API_URL + '/organizations/' + orgId;

  const requestData = {
    headers,
    method: 'GET',
  };

  return await fetch(url, requestData).then(response => response.json());
}

export async function registerOrganization(token, orgDataObject) {
  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url = BASE_API_URL + '/organizations/register';

  const requestData = {
    headers,
    body: JSON.stringify(orgDataObject),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

function verificationObj() {
  const obj = {
    is_verified: true,
  };
  return obj;
}

export async function verifyOrganization(token, orgId) {
  const verificationData = verificationObj();

  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url = BASE_API_URL + '/organizations/' + orgId + '/verify';

  const requestData = {
    headers,
    body: JSON.stringify(verificationData),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

/**
 * Events endpoints
 */
export async function createEvent(token, orgId, eventPayload) {
  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url = BASE_API_URL + '/organizations/' + orgId + '/events';

  const requestData = {
    headers,
    body: JSON.stringify(eventPayload),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

export async function cancelEvent(token, orgId, eventId) {
  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url = BASE_API_URL + '/organizations/' + orgId + '/events/' + eventId;

  const requestData = {
    headers,
    method: 'DELETE',
  };

  return await fetch(url, requestData);
}
