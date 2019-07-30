import _ from 'lodash';
import { API } from 'aws-amplify';
import { getEnvVariable } from './environmentVariables';
const API_NAME = getEnvVariable('REACT_APP_API_NAME');

export const compose = (...list) =>
  list.reduce((next, current) => (...args) => next(current(...args)));

/**
 * Get error object for api request error
 *
 * @param {any} error Could be an exception, api error response etc.
 *
 * @returns {object} with the awsErrorCode (if any), the http response statusCode (if any) and the translation key for the appropriate errorMessage
 */
export const getErrorData = error => {
  const apiErrorCode = _.get(error, 'data.Error', '');
  const code = _.get(error, 'code', apiErrorCode); // grab cognito error code or default to Error received from api
  const statusCode = _.get(error, 'status', -1);

  let errorMessage;
  switch (code) {
    case 'UsernameExistsException':
      errorMessage = 'common:auth_error_user_already_exists';
      break;
    case 'UserNotFoundException':
      errorMessage = 'common:auth_error_user_not_found';
      break;
    case 'LimitExceededException':
      errorMessage = 'common:auth_error_request_limit_exceeded';
      break;
    case 'UserNotConfirmedException':
      errorMessage = 'common:auth_error_user_not_confirmed';
      break;
    case 'NotAuthorizedException':
      // The NotAuthorizedException is used for a variety of errors, using the message from AWS itself might be more appropriate than our 'common:auth_error_not_authorized' message.
      errorMessage = _.get(
        error,
        'message',
        'common:auth_error_not_authorized'
      );
      break;
    case 'InvalidParameterException':
      if (
        _.get(error, 'message') ===
        'Cannot reset password for the user as there is no registered/verified email or phone_number'
      ) {
        errorMessage = 'common:auth_error_user_not_found';
      } else {
        errorMessage = _.get(error, 'message', 'common:server_err_4xx');
      }
      break;
    case 'CodeMismatchException':
      errorMessage = 'common:auth_error_code_mismatch';
      break;
    default:
      if (statusCode >= 500) {
        errorMessage = _.get(error, 'message', 'common:server_err_5xx');
      } else if (statusCode === 401) {
        errorMessage = _.get(error, 'message', 'common:server_err_401');
      } else if (statusCode >= 400) {
        errorMessage = _.get(error, 'message', 'common:server_err_4xx');
      } else {
        errorMessage = _.get(error, 'message', 'common:server_err_default');
      }
  }

  return {
    awsErrorCode: code,
    statusCode: statusCode,
    errorMessage: errorMessage,
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
      ...getErrorData(_.get(error, 'response', {})),
    };
  }
};
