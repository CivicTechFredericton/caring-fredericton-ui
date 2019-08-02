import { Auth } from 'aws-amplify';

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import history from '../../history';
import { getUserDetails } from '../endpoints';
import { setUserDetails, removeUserDetails } from '../../utils/localStorage';

import { getEnvVariable } from '../../utils/environmentVariables';

//Login api call
export const authenticateUser = (username, password, callback) => {
  Auth.signIn({
    username,
    password,
  })
    .then(user => {
      // Get the user details
      getUserDetails(user.attributes.sub).then(result => {
        setUserDetails(result.data);
        callback(null, result);
      });
    })
    .catch(err => callback(err));
};

// Confirm user registration code
export const confirmCode = (username, code, callback) => {
  Auth.confirmSignUp(username, code, {
    forceAliasCreation: true,
  })
    .then(data => callback(null, data))
    .catch(err => callback(err));
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
//export const isValidSession = async () => {
export const isValidSession = () => {
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

  // TODO: Replace with Amplify version
  /*let val;
  Auth.currentAuthenticatedUser((err, session) => {
        if (err) {
          val = false;
        }

        if (session) {
          val = true;
        }

        val = false;
      });

  return val;*/

  /*Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {return true;})
      .catch(err => {return false;});*/
};

// Todo needs user privilages to add to valid session
//export const isValidUser = async () => {
export const isValidUser = () => {
  return isValidSession();
};
