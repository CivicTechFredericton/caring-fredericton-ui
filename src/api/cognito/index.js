import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import config from '../aws/dev';
import history from '../../history';
import { getUserDetails } from '../endpoints';
import { setUserDetails, removeUserDetails } from '../../utils/localStorage';

const userPool = new CognitoUserPool(config.COGNITO_POOL_DETAILS);

//Login api call
export const authenticateUser = (Username, Password, callback) => {
  const authDetails = new AuthenticationDetails({
    Username,
    Password,
  });

  const cognitoUser = new CognitoUser({
    Username,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: result => {
      // Get the user details
      getUserDetails(result.idToken, result.idToken.payload.sub).then(
        result => {
          setUserDetails(result);
          callback(null, result);
        }
      );

      // callback(null, result);
    },
    onFailure: err => {
      callback(err);
    },
  });
};

// Logout api call
export const signOut = () => {
  removeUserDetails();
  userPool.getCurrentUser().signOut();
  history.push('/');
};

// Session token
export const getSession = callback => {
  userPool.getCurrentUser().getSession((err, session) => {
    if (err) {
      callback(err);
    }

    callback(session);
  });
};

// Confirm user registration code
export async function confirmCode(username, verificationCode, callback) {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  // TODO: Handle the callback; console throws an error (uncaught (in promise) callback is not a function)
  cognitoUser.confirmRegistration(verificationCode, true, callback);
}

// check for validation
export const isValidSession = () => {
  const dev = false;

  if (dev) {
    return true;
  }

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

// Todo needs user privilages to add to valid session
export const isValidUser = () => {
  return isValidSession();
};

// Todo need organization end point to validate as well as use valid session
export const getUserOrganization = () => {
  if (isValidSession()) {
    return false;
  }

  return false;
};

export const getCurrentUser = callback => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    return false;
  }

  cognitoUser.getSession((err, session) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(session);
  });
};
