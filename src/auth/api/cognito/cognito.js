import Auth from '@aws-amplify/auth';
import { getAuthErrorData } from '../../utils/func';

export const handleAuthCall = async (asyncFunc) => {
  try {
    const data = await asyncFunc;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      ...getAuthErrorData(error),
    };
  }
};

const getUser = (user) => {
  return {
    name: user.username,
    sub: user.attributes.sub,
    email: user.attributes.email,
  };
};

/**
 * Signs in user
 * @param {string} username
 * @param {string} password
 * @return {User}
 */
export const signIn = async (username, password) => {
  try {
    const result = await Auth.signIn(username, password);
    if (!result.challengeName) {
      const user = getUser(result);
      return {
        success: true,
        data: user,
      };
    }
    return result;
  } catch (error) {
    return {
      success: false,
      ...getAuthErrorData(error),
    };
  }
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
 * @returns {any | {error}}
 */
export const signOut = async () => {
  try {
    return await Auth.signOut();
  } catch (error) {
    return { error };
  }
};

/**
 * Signs user Up
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const signUp = async (userParams) => {
  let username = userParams.email;
  let password = userParams.password;

  return await handleAuthCall(
    Auth.signUp({
      username,
      password,
      attributes: {
        email: username,
        given_name: userParams.firstName,
        family_name: userParams.lastName,
      },
    })
  );
};

/**
 * Confirm user verification code
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const confirmSignUp = async (username, code) => {
  return await handleAuthCall(
    Auth.confirmSignUp(username, code, {
      forceAliasCreation: true,
    })
  );
};

/**
 * Resend user verification code
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const resendSignUp = async (username) => {
  return await handleAuthCall(Auth.resendSignUp(username));
};

/**
 * Reset user password
 * @return {{ success: boolean, data: any } || { success: false, awsErrorCode: string, statusCode: number, errorMesssage : string}}
 */
export const resetPassword = async (username) => {
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
