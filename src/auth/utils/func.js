import _ from 'lodash';

export const getAuthErrorData = (error) => {
  const code = error.code;
  let message = error.message;

  let messageKey;
  switch (code) {
    case 'UsernameExistsException':
      messageKey = 'error:authErrorUserAlreadyExists';
      break;
    case 'UserNotFoundException':
      messageKey = 'error:authErrorUserNotFound';
      break;
    case 'UserNotConfirmedException':
      messageKey = 'error:authErrorUserNotConfirmed';
      break;
    case 'InvalidPasswordException':
      if (message.includes('long enough')) {
        messageKey = 'error:passwordTooShort';
      } else if (message.includes('numeric')) {
        messageKey = 'error:passwordMissingNumber';
      } else if (message.includes('lowercase')) {
        messageKey = 'error:passwordMissingLowercase';
      } else if (message.includes('uppercase')) {
        messageKey = 'error:passwordMissingUppercase';
      } else if (message.includes('symbol')) {
        messageKey = 'error:passwordMissingSymbol';
      } else {
        messageKey = 'error:defaultMessage';
      }
      break;
    case 'InvalidParameterException':
      if (
        message.includes('member must have length greater than or equal to 6')
      ) {
        messageKey = 'error:passwordTooShort';
      } else if (
        message.includes('no registered/verified email or phone_number')
      ) {
        messageKey = 'error:authErrorUserNotFound';
      } else {
        messageKey = _.get(error, 'message', 'error:serverError4xx');
      }
      break;
    case 'CodeMismatchException':
      messageKey = 'error:authErrorCodeMismatch';
      break;
    case 'LimitExceededException':
      messageKey = 'error:authErrorRequestLimitExceeded';
      break;
    case 'NotAuthorizedException':
      // The NotAuthorizedException is used for a variety of errors, using the message from AWS itself might be more appropriate than our 'common:auth_error_not_authorized' message.
      messageKey = _.get(error, 'message', 'error:invalidCredentials');
      break;
    default:
      messageKey = 'error:defaultMessage';
      break;
  }

  return {
    awsErrorCode: code,
    errorMessage: messageKey,
    errorData: _.get(error, 'data', {}),
  };
};
