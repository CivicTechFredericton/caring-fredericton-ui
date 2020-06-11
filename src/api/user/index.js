import { awsApiRequest } from '../utils/func';

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
