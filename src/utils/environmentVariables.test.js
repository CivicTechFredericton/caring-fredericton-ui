import { fillInWithEnvVariables } from './environmentVariables';

describe('Environment variables', () => {
  test('fillInWithEnvVariables should return correct object', async () => {
    const resolver = jest.fn((key) => {
      return {
        REACT_APP_USER_POOL_ID: 'asd123',
        REACT_APP_USER_POOL_WEB_CLIENT_ID: 'client321',
      }[key];
    });

    const rawConfig = {
      AUTH: {
        UserPoolId: '%REACT_APP_USER_POOL_ID%',
        ClientId: '%REACT_APP_USER_POOL_WEB_CLIENT_ID%',
      },
    };

    const expectedConfig = {
      AUTH: {
        UserPoolId: 'asd123',
        ClientId: 'client321',
      },
    };

    expect(fillInWithEnvVariables(rawConfig, resolver)).toEqual(expectedConfig);
    expect(resolver.mock.calls.length).toBe(2);
  });
});
