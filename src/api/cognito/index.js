import {
  CognitoUserPool,
  CognitoUserAttribute,
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

export async function confirmCode(Username, code) {
  const cognitoUser = new CognitoUser({
    Username,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) {
      alert(err);
      return;
    }
    alert(result);
  });
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

////////////////////// To Check

/// These functions may not be used.

export const createUser = (username, email, password, callback) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
  ];

  // Username must be unique in a pool, and cant be a valid email format
  // To log in with email, make sure it is set as an alias attribute in Cognito
  // More info: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-usernames

  userPool.signUp(username, password, attributeList, null, callback);
};

export const verifyUser = (username, verifyCode, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(verifyCode, true, callback);
};

export const getCurrentUser = callback => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) return false;

  cognitoUser.getSession((err, session) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(session);

    // console.log('Session valid?', session.isValid());
    // console.log(session);
  });
};
