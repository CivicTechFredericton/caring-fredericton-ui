import { Auth } from 'aws-amplify';

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import history from '../../history';
import { createUser, getUserDetails } from '../endpoints';
import { setUserDetails, removeUserDetails } from '../../utils/localStorage';

import { getEnvVariable } from '../../utils/environmentVariables';

// Login api call
export const signIn = async (username, password) => {
  try {
    const resp = await Auth.signIn(username, password);
    if (resp.challengeName) {
      return {
        challenge: {
          name: resp.challengeName,
          param: resp.challengeParam,
        },
        user: resp,
      };
    }

    await getUserDetails(resp.attributes.sub).then(result => {
      setUserDetails(result.data);
    });

    return await currentAuthenticatedUser();
  } catch (error) {
    return { error };
  }
};

// User sign up
export const signUp = async (username, password, attributes) => {
  try {
    // TODO: Implement Post Confirmation trigger on the user pool
    const result = await Auth.signUp({ username, password, attributes });

    // Create the DynamoDB user record upon success
    let userParams = {
      user_sub: result.userSub,
      email: attributes.email,
      first_name: attributes.given_name,
      last_name: attributes.family_name,
    };

    await createUser(userParams);

    return result;
  } catch (error) {
    return { error };
  }
};

// Confirm user registration code
export const confirmCode = async (username, code) => {
  try {
    return await Auth.confirmSignUp(username, code, {
      forceAliasCreation: true,
    });
  } catch (error) {
    return { error };
  }
};

// Logout api call
export const signOut = () => {
  Auth.signOut()
    .then(data => {
      removeUserDetails();
      history.push('/');
    })
    .catch(err => console.log(err));
};

/**
 * Returns current signed in user if exists
 * @return {User}
 */
export const currentAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { name: user.username, email: user.attributes.email };
  } catch (error) {
    return { error };
  }
};

// Session token
export const getSession = callback => {
  Auth.currentSession()
    .then(session => callback(session))
    .catch(err => callback(err));
};

// check for validation
export const isValidSession = async () => {
  // TODO: Adjust downstream components to use async/await in order to use this function
  return await Auth.currentAuthenticatedUser({
    bypassCache: false,
  })
    .then(user => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

export const isValidUser = () => {
  let poolData = {
    UserPoolId: getEnvVariable('REACT_APP_USER_POOL_ID'),
    ClientId: getEnvVariable('REACT_APP_USER_POOL_WEB_CLIENT_ID'),
  };

  let userPool = new CognitoUserPool(poolData);

  if (!userPool.getCurrentUser()) {
    return false;
  }

  return userPool.getCurrentUser().getSession((err, session) => {
    if (err) {
      return false;
    }

    if (session.isValid()) {
      return true;
    }

    return false;
  });
};
