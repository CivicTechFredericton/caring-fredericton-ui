import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import dev from '../aws/dev';
import history from '../../history';

const userPool = new CognitoUserPool(dev.COGNITO_POOL_DETAILS);

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

export const authenticateUser = (email, password, callback) => {
  const authData = {
    Username: email,
    Password: password,
  };
  const authDetails = new AuthenticationDetails(authData);
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: result => {
      //  console.log('access token + ' + result.getAccessToken().getJwtToken());
      callback(null, result);
    },
    onFailure: err => {
      callback(err);
    },
  });
};

export const signOut = () => {
  userPool.getCurrentUser().signOut();
  history.push('/');
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

    console.log('Session valid?', session.isValid());
    console.log(session);
  });
};

export const getSession = callback => {
  userPool.getCurrentUser().getSession((err, session) => {
    if (err) {
      console.log(err);
      return;
    }

    callback(session);
  });
};

export const isValidSession = () => {
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

export const isValidUser = () => {
  return isValidSession();
};

export const getUserOrganization = () => {
  if (isValidSession()) {
    return false;
  }
  return false;
};
