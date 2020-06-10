import { awsApiRequest } from '../utils/func';

export async function registerOrganization(values) {
  try {
    const body = {
      name: values.orgName,
      email: values.orgEmail,
      phone: values.phoneNumber,
      administrator_id: values.administratorId,
      address: {
        street: values.street,
        city: values.city,
        province: values.province,
        postal_code: values.postalCode,
        country: values.country,
      },
    };

    return await awsApiRequest({
      method: 'POST',
      path: '/organizations',
      params: {
        body: body,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function getOrganizationDetails(orgId) {
  try {
    return await awsApiRequest({
      method: 'GET',
      path: `/organizations/${orgId}`,
    });
  } catch (error) {
    return error;
  }
}

export async function verifyOrganization(orgId) {
  try {
    const body = {
      is_verified: true,
    };

    return await awsApiRequest({
      method: 'POST',
      path: `/organizations/${orgId}/verify`,
      params: {
        body: body,
      },
    });
  } catch (error) {
    return error;
  }
}
