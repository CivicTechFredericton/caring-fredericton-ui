import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

import {
  fillInWithEnvVariables,
  getEnvVariable,
} from '../utils/environmentVariables';

Auth.configure({
  Auth: {
    region: getEnvVariable('REACT_APP_REGION'),
    userPoolId: getEnvVariable('REACT_APP_USER_POOL_ID'),
    userPoolWebClientId: getEnvVariable('REACT_APP_USER_POOL_WEB_CLIENT_ID'),
  },
});

const apiConfig = fillInWithEnvVariables(
  {
    endpoints: [
      {
        region: '%REACT_APP_REGION%',
        name: '%REACT_APP_API_NAME%',
        endpoint: '%REACT_APP_API_URL%',
      },
    ],
  },
  getEnvVariable
);

const headers = async () => {
  try {
    return { Authorization: (await Auth.currentSession()).idToken.jwtToken };
  } catch (e) {
    return {};
  }
};

apiConfig.endpoints[0].custom_header = headers;

API.configure(apiConfig);
