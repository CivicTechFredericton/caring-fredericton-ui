import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import dev from '../aws/dev';
import history from '../../history';

const userPool = new CognitoUserPool(dev.COGNITO_POOL_DETAILS);

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
      callback(null, result);
    },
    onFailure: err => {
      callback(err);
    },
  });
};

// Logout api call
export const signOut = () => {
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
  console.log(username);
  console.log(verificationCode);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
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
