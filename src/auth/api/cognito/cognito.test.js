import { Auth } from 'aws-amplify';
import { signIn, handleAuthCall } from './cognito';

jest.mock('aws-amplify');

describe('Cognito api test', () => {
  test('signIn should return success true and user data', async () => {
    const expectedUser = { name: 'TestBot', email: 'test.bot@gmail.com' };
    const expectedResponse = {
      username: 'TestBot',
      Session: null,
      attributes: { name: 'TestBot', email: 'test.bot@gmail.com' },
    };
    const expectedCurrentAuthenticatedUser = {
      Session: null,
      attributes: { name: 'TestBot', email: 'test.bot@gmail.com' },
    };
    const expectedResult = {
      success: true,
      data: expectedUser,
    };

    Auth.currentAuthenticatedUser.mockImplementation(() =>
      Promise.resolve(expectedCurrentAuthenticatedUser)
    );
    Auth.signIn.mockImplementation(() => Promise.resolve(expectedResponse));

    expect(await signIn('name', 'psw')).toEqual(expectedResult);
  });

  test('signIn should return success false with an errorMessage', async () => {
    const expectedResult = {
      success: false,
      awsErrorCode: 'UserNotConfirmedException',
      statusCode: 401,
      errorMessage: 'common:auth_error_user_not_confirmed',
      errorData: {},
    };
    const expectedResponse = { code: 'UserNotConfirmedException', status: 401 };

    Auth.signIn.mockImplementation(() => Promise.reject(expectedResponse));

    expect(await signIn('name', 'psw')).toEqual(expectedResult);
  });

  test('handleAuthCall should return success true and data', async () => {
    const expectedResult = { success: true, data: 'successData' };

    const asyncApiCall = async () => {
      return 'successData';
    };

    expect(await handleAuthCall(asyncApiCall())).toEqual(expectedResult);
  });

  test('handleAuthCall should return success false with error data', async () => {
    const expectedResult = {
      success: false,
      awsErrorCode: 'UserNotConfirmedException',
      statusCode: 401,
      errorMessage: 'common:auth_error_user_not_confirmed',
      errorData: {},
    };
    const expectedResponse = { code: 'UserNotConfirmedException', status: 401 };

    const asyncApiCall = async () => {
      throw expectedResponse;
    };

    expect(await handleAuthCall(asyncApiCall())).toEqual(expectedResult);
  });
});
