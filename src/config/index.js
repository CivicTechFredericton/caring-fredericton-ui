import Amplify, { Auth } from 'aws-amplify';
import {
  fillInWithEnvVariables,
  getEnvVariable,
} from '../utils/environmentVariables';

const awsAmplifyConfig = fillInWithEnvVariables(
  {
    Auth: {
      userPoolId: '%REACT_APP_USER_POOL_ID%',
      userPoolWebClientId: '%REACT_APP_USER_POOL_WEB_CLIENT_ID%',
      region: '%REACT_APP_REGION%',
    },
    API: {
      endpoints: [
        {
          name: '%REACT_APP_API_NAME%',
          endpoint: '%REACT_APP_API_URL%',
          region: '%REACT_APP_REGION%',
        },
      ],
    },
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

awsAmplifyConfig.API.endpoints[0].custom_header = headers;

Amplify.configure(awsAmplifyConfig);
