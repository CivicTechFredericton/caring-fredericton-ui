import _ from 'lodash';
import { Auth } from 'aws-amplify';
import { getErrorData } from '../../../utils/func';

export const handleAuthCall = async asyncFunc => {
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
};

/**
 * Authentication types
 * @typedef {({ name: string, email: string } | {error: {message: string})} User
 */

const getUser = user => {
  // TODO: verify get user name once cognito backend is ready
  return {
    name: _.get(user, 'attributes.name', ''),
    email: _.get(user, 'attributes.email', ''),
  };
};

/**
 * Signs in user
 * @param {string} username
 * @param {string} password
 * @return {{ success: boolean, data: {User} } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const signIn = async (username, password) => {
  try {
    const result = await Auth.signIn(username, password);
    if (!result.challengeName) {
      const user = await currentAuthenticatedUser();
      return {
        success: true,
        data: user,
      };
    }
    return result;
  } catch (error) {
    return {
      success: false,
      ...getErrorData(error),
    };
  }
};

export const completeNewPassword = async (user, newPassword) => {
  return await handleAuthCall(Auth.completeNewPassword(user, newPassword));
};

/**
 * Returns current signed in user if exists
 * @return {User | {error}}
 */
export const currentAuthenticatedUser = async () => {
  try {
    let user = await Auth.currentAuthenticatedUser();
    return getUser(user);
  } catch (error) {
    return { error };
  }
};

/**
 * Signs user Out
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const signOut = async () => {
  return await handleAuthCall(Auth.signOut());
};

/**
 * Signs user Up
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */

export const signUp = async (username, password, attributes) => {
  return await handleAuthCall(Auth.signUp({ username, password, attributes }));
};

/**
 * Resends the signup confirmation code
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */

export const resendSignUp = async username => {
  return await handleAuthCall(Auth.resendSignUp(username));
};

/**
 * Confirm sign up user
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const confirmSignUp = async (username, code) => {
  return await handleAuthCall(Auth.confirmSignUp(username, code));
};

/**
 * Reset user password
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const resetPassword = async username => {
  return await handleAuthCall(Auth.forgotPassword(username));
};

/**
 * Confirm user password reset
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const confirmResetPassword = async (username, code, password) => {
  return await handleAuthCall(
    Auth.forgotPasswordSubmit(username, code, password)
  );
};
