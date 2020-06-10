import { Auth } from 'aws-amplify';
import { signIn } from './cognito';

describe('Cognito api test', () => {
  test('signIn should return user', async () => {
    const expectedUser = { name: 'TestBot', email: 'test.bot@gmail.com' };
    const expectedResponse = {
      username: 'TestBot',
      Session: null,
      attributes: { email: 'test.bot@gmail.com' },
    };
    Auth.signIn = jest.fn().mockImplementation(() => ({}));
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockImplementation(() => expectedResponse);

    expect(await signIn('name', 'psw')).toEqual(expectedUser);
  });

  test('signIn should return error', async () => {
    const expectedError = { error: { message: 'some error' } };
    const expectedResponse = { message: 'some error' };

    Auth.signIn = jest.fn().mockImplementation(() => {
      throw expectedResponse;
    });
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockImplementation(() => expectedResponse);

    expect(await signIn('name', 'psw')).toEqual(expectedError);
  });
});
