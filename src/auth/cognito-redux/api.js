/*
  This class uses async chunk loading to pull out the cognito identity
  libraries which make up about 1/3 of entire bundle size. This is done
  to ensure that if "main" vendor dependencies change, users won't be required
  to redownload the entire lib again
*/
const CognitoSDK = import(/* webpackChunkName: 'aws-cognito' */ 'amazon-cognito-identity-js');

import { COGNITO_POOL_DETAILS } from 'APP_CONFIG';
import autobind from 'class-autobind';
import { ERRORS } from './constants';

let _pool = null;

const getPool = () => {
  return CognitoSDK.then(({ CognitoUserPool }) => {
    if (!_pool) {
      _pool = new CognitoUserPool(COGNITO_POOL_DETAILS);
    }

    return _pool;
  });
};

export const currentUser = () => {
  return getPool().then(pool => pool.getCurrentUser());
};

export const getCurrentUserSession = () => {
  return currentUser().then((user) => {
    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        if(err) {
          reject(err);
        }

        resolve(session);
      });
    });
  })
};

const _requiredAttributePresent = (attribute, userAttributes, newAttributes) => {
  if (userAttributes && userAttributes[attribute] !== '') {
    return true;
  }

  if (newAttributes && newAttributes[attribute] !== '') {
    return true;
  }

  return false;
};

export const signUp = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    Promise.all([getPool(), CognitoSDK]).then(([pool, { CognitoUserAttribute }]) => {
      const dataEmail = {
        Name: 'email',
        Value: username
      };

      const attributes = [new CognitoUserAttribute(dataEmail)];

      pool.signUp(username, password, attributes, null, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    })
  });
};


export const verifyUser = (payload) => {
  return new Promise((resolve, reject) => {
    Promise.all([getPool(), CognitoSDK]).then(([pool, { CognitoUser }]) => {
      const cognitoUser = new CognitoUser({
        Pool: pool,
        Username: payload.username
      });

      cognitoUser.confirmRegistration(payload.code, true, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result)
      });
    })
  });
};

export const setUserPassword = (payload) => {
  return new Promise((resolve, reject) => {
    Promise.all([getPool(), CognitoSDK]).then(([pool, { CognitoUser }]) => {
      const cognitoUser = new CognitoUser({
        Pool: pool,
        Username: payload.username
      });

      cognitoUser.confirmPassword(payload.verificationCode, payload.password, {
        onSuccess() {
          resolve()
        },
        onFailure(err) {
          reject(err)
        }
      });
    });
  });
};

export const forgotUserPassword = (payload) => {
  return new Promise((resolve, reject) => {
    Promise.all([getPool(), CognitoSDK]).then(([pool, { CognitoUser }]) => {
      const cognitoUser = new CognitoUser({
        Pool: pool,
        Username: payload.username
      });

      cognitoUser.forgotPassword({
        onSuccess: function () {
          resolve(payload.username);
        },
        onFailure: function(err) {
          reject(err);
        }
      });
    });
  });
};

/**
 * Changes the current user's password.
 * @param {string} oldPassword The user's current password for authentication
 * @param {string} newPassword The desired new password
 */
export const changeUserPassword = ({ oldPassword, newPassword }) => {
  return new Promise((resolve, reject) => {
    currentUser().then(currentUser => {
      // get session otherwise the .changePassword call will fail
      currentUser.getSession((err) => {
        if (err) {
          return reject(err);
        }
        currentUser.changePassword(oldPassword, newPassword, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    });
  });
};

class CognitoAuthorizer {
  constructor(props) {
    this.props = props;

    this._user = this._getUser();
    this._details = this._getDetails();


    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    autobind(this);
  }

  _getUser() {
    const { username, session } = this.props;

    return Promise.all([getPool(), CognitoSDK]).then(([pool, { CognitoUser }]) => {
      const user = new CognitoUser({
        Pool: pool,
        Username: username
      });

      if (session) {
        user.Session = session;
      }

      return user;
    });
  }

  _getDetails() {
    const { username, password } = this.props;

    return CognitoSDK.then(({ AuthenticationDetails }) => {

      return new AuthenticationDetails({
        Username: username,
        Password: password
      }
      )
    });
  }

  authorize() {
    const { mfaCode } = this.props;

    return Promise.all([this._user, this._details])
      .then(([user, details]) => {

        mfaCode ?
          user.sendMFACode(mfaCode, this) :
          user.authenticateUser(details, this);

        return this._promise;
      })

  }

  onSuccess() {
    return this._resolve(currentUser());
  }

  onFailure(err) {
    return this._reject(err);
  }

  newPasswordRequired(userAttributes, requiredAttributes) {
    const { newPassword, attributesData } = this.props;

    if (newPassword) {
      const missingAttributes = requiredAttributes.filter(attr => {
        if (!_requiredAttributePresent(attr, userAttributes, attributesData)) {
          return attr;
        }
      });

      if (missingAttributes.length > 0) {
        return this._reject({
          code: ERRORS.AttributesRequired,
          attributesRequired: missingAttributes
        });
      }

      this._user.then(user => user.completeNewPasswordChallenge(newPassword, attributesData, this));

      return;
    }

    return this._reject({
      code: ERRORS.NewPasswordRequired, userAttributes, requiredAttributes
    });
  }

  mfaRequired() {
    const { mfaCode } = this.props;

    if (mfaCode) {
      this._user.then(user => user.sendMFACode(mfaCode));
    }

    return this._user.then(user => this._reject({
      code: ERRORS.MFARequired,
      session: user.Session
    }));
  }

  customChallenge(e) {
    return this._reject(e);
  }
}

export const authorize = (props) => {
  const authorizer = new CognitoAuthorizer(props);

  return authorizer.authorize();
};
