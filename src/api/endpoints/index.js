import dev from '../aws/dev';

const base_api_url = dev.API_URL;

/**
 * Guest user endpoints
 */
export async function listEventsForGuestUser(start_date, end_date, categories) {
  let url = new URL(base_api_url + '/guests/events');
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
  let url = base_api_url + '/guests/organizations';

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
export async function createUser(user) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  const url = base_api_url + '/users/signup';

  const requestData = {
    headers,
    body: JSON.stringify(user),
    method: 'POST',
  };

  return await fetch(url, requestData);
}

export async function getUserDetails(token, userId) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('Authorization', token.jwtToken);
  const url = base_api_url + '/users/' + userId;

  const requestData = {
    headers,
    method: 'GET',
  };

  return await fetch(url, requestData).then(response => response.json());
}

/**
 * Organization endpoints
 */
export async function getOrganizatonDetails(token, orgId) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('Authorization', token.jwtToken);
  const url = base_api_url + '/organizations/' + orgId;

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
  const url = base_api_url + '/organizations/register';

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
  const url = base_api_url + '/organizations/' + orgId + '/verify';

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
export async function createEvent(token, orgId, event) {
  const headers = new Headers();
  headers.append('Authorization', token.jwtToken);
  headers.append('content-type', 'application/json');
  const url = base_api_url + '/organizations/' + orgId + '/events';

  const requestData = {
    headers,
    body: JSON.stringify(event),
    method: 'POST',
  };

  return await fetch(url, requestData);
}
