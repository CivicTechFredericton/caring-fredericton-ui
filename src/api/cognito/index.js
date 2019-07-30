import { Auth } from 'aws-amplify';
//import { getErrorData } from "../../utils/func";

/*import {
  CognitoUserPool,
  //CognitoUser,
  //AuthenticationDetails,
} from 'amazon-cognito-identity-js';*/
//import config from '../aws/dev';
import history from '../../history';
import { getUserDetails } from '../endpoints';
import { setUserDetails, removeUserDetails } from '../../utils/localStorage';

//const userPool = new CognitoUserPool(config.COGNITO_POOL_DETAILS);

/*export const handleAuthCall = async (asyncFunc) => {
  try {
    const data = await asyncFunc;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      ...getErrorData(error),
    };
  }
}*/

/*const getUser = user => {
  // TODO: verify get user name once cognito backend is ready
  return { name: _.get(user, 'attributes.name', ''), email: _.get(user, 'attributes.email', '') };
}*/

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
/*export const currentAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { name: user.username, email: user.attributes.email };
  } catch (error) {
    return { error };
  }
};*/

// Session token
export const getSession = callback => {
  Auth.currentSession()
    .then(session => callback(session))
    .catch(err => callback(err));

  /*userPool.getCurrentUser().getSession((err, session) => {
    if (err) {
      callback(err);
    }

    callback(session);
  });*/
};

// check for validation
//export const isValidSession = async () => {
export const isValidSession = () => {
  //let validSession = false;
  //const user = Auth.currentAuthenticatedUser();
  //const result = Auth.currentAuthenticatedUser();
  //console.log(user);
  /*if (user === true) {
    return true;
  }*/

  //return false;
  //return result.success;
  /*try {
    await Auth.currentAuthenticatedUser();
    validSession = true;
  } catch (error) {
    validSession = false;
  }*/

  //return validSession;

  //let validSession = false;
  /*try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch(e) {
    return false;
  }*/

  Auth.currentAuthenticatedUser({
    bypassCache: false,
  })
    .then(
      () => {
        return true;
      }
      //Promise.resolve(true);
      //returnTrue();
    )
    .catch(
      () => {
        return false;
      }
      //Promise.resolve(false);
      //returnFalse();
      //console.log(err);
      //callback(false);
    );

  //return Promise.resolve(result);
  //return Promise.resolve(result);
  //console.log(Promise.resolve(validSession.success));
  //validSession.then(validSession => { return validSession.success; })
  //console.log(validSession);

  //return false;
  /*Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {return true;})
      .catch(err => {return false;});*/

  //return validSession;
  //currentUser = currentAuthenticatedUser
  /*const dev = false;

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
  });*/
};

// Todo needs user privilages to add to valid session
//export const isValidUser = async () => {
export const isValidUser = () => {
  /*Auth.currentAuthenticatedUser({
    bypassCache: false
  }).then(user => console.log(user))
    .catch(err => {return {err}});*/

  let val = isValidSession();
  console.log(val);
  //return await isValidSession();

  return false;
};

// Todo need organization end point to validate as well as use valid session
/*export const getUserOrganization = () => {
  if (isValidSession()) {
    return false;
  }

  return false;
};*/

/*export const getCurrentUser = callback => {
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
};*/
