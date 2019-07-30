import { awsApiRequest } from '../../../utils/func';

export const signUp = async bodyParams => {
  try {
    return await awsApiRequest({
      method: 'POST',
      path: '/users/signup',
      params: {
        body: bodyParams,
      },
    });
  } catch (error) {
    return error;
  }
};

/*export const getUser = async email => {
    try {
        return await awsApiRequest({
            method: 'GET',
            path: `/users/email/${email}`,
        });
    } catch (error) {
        return error;
    }
};*/
