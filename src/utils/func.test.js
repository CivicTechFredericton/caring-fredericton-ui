import { getErrorData, awsApiRequest } from './func';
import { API } from 'aws-amplify';

describe('getErrorData util func test', () => {
  test('cognito error code "UserNotFoundException" should return error data with errorMessage "common:auth_error_user_not_found"', async () => {
    const errorResponse = {
      code: 'UserNotFoundException',
    };
    expect(getErrorData(errorResponse).errorMessage).toEqual(
      'common:auth_error_user_not_found'
    );
  });

  test('server error code >= 500 should return error data with errorMessage "common:server_err_5xx"', async () => {
    const errorResponse = {
      status: 503,
    };
    expect(getErrorData(errorResponse).errorMessage).toEqual(
      'common:server_err_5xx'
    );
  });

  test('server error code >= 400 && < 500 should return error data with errorMessage "common:server_err_4xx"', async () => {
    const errorResponse = {
      status: 403,
    };
    expect(getErrorData(errorResponse).errorMessage).toEqual(
      'common:server_err_4xx'
    );
  });

  test('cognito error code "NotAuthorizedException" should return error data with errorMessage "common:auth_error_not_authorized" (and takes presedance over the status code)', async () => {
    const errorResponse = {
      code: 'NotAuthorizedException',
      status: 401,
    };
    expect(getErrorData(errorResponse).errorMessage).toEqual(
      'common:auth_error_not_authorized'
    );
  });
});

describe('awsApiRequest util func test', () => {
  test('awsApiRequest success result', async () => {
    const mockSuccessResponse = [
      { id: 1, name: 'Farming' },
      { id: 2, name: 'Technology' },
    ];
    const expectedResult = { success: true, data: mockSuccessResponse };

    API.get = jest.fn().mockImplementation(() => mockSuccessResponse);

    expect(
      await awsApiRequest({
        endpoint: '/industries',
      })
    ).toEqual(expectedResult);
  });

  test('awsApiRequest failed result', async () => {
    const errorResponse = {
      response: {
        status: 401,
        code: 'NotAuthorizedException',
      },
    };
    const expectedResult = {
      success: false,
      statusCode: 401,
      awsErrorCode: 'NotAuthorizedException',
      errorMessage: 'common:auth_error_not_authorized',
      errorData: {},
    };

    API.get = jest.fn().mockImplementation(() => Promise.reject(errorResponse));

    expect(
      await awsApiRequest({
        endpoint: '/industries',
      })
    ).toEqual(expectedResult);
  });
});
