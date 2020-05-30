import _ from 'lodash';
import API from '@aws-amplify/api';
import { getEnvVariable } from '../../utils/environmentVariables';
const API_NAME = getEnvVariable('REACT_APP_API_NAME');

export const getApiErrorData = (error) => {
  const statusCode = _.get(error, 'status', -1);
  let messageKey;

  if (statusCode === 401) {
    messageKey = _.get(error, 'message', 'error:serverError401');
  } else if (statusCode >= 400) {
    messageKey = _.get(error, 'message', 'error:serverError4xx');
  } else if (statusCode >= 500) {
    messageKey = _.get(error, 'message', 'error:serverError5xx');
  } else {
    messageKey = _.get(error, 'message', 'error:defaultMessage');
  }

  return {
    statusCode: statusCode,
    errorMessage: messageKey,
    errorData: _.get(error, 'data', {}),
  };
};

/**
 * Make an aws API request
 * @param {string} apiName  - The api name of the request
 * @param {string} method  - One of: GET, POST, PUT, PATCH, DELETE, HEAD
 * @param {string} path - The path of the request
 * @param {json} params - See API.<method> for format
 * @return {Promise} - A promise that resolves to an object with a boolean success flag, data (response data) if successful or errorMessage if request failed.
 */
export const awsApiRequest = async ({
  apiName = API_NAME,
  method = 'GET',
  path = '',
  params,
}) => {
  let apiRequest;
  switch (method) {
    case 'POST':
      apiRequest = API.post(apiName, path, params);
      break;
    case 'PUT':
      apiRequest = API.put(apiName, path, params);
      break;
    case 'PATCH':
      apiRequest = API.patch(apiName, path, params);
      break;
    case 'DELETE':
      apiRequest = API.del(apiName, path, params);
      break;
    case 'HEAD':
      apiRequest = API.head(apiName, path, params);
      break;
    case 'GET':
    default:
      apiRequest = API.get(apiName, path, params);
      break;
  }

  try {
    const responseData = await apiRequest;
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      ...getApiErrorData(_.get(error, 'response', {})),
    };
  }
};
