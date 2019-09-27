/**
 * Returns value by key
 * @param key - example: REACT_APP_AWS_API
 * @param defaultValue
 * @returns {string} - environment variable value
 */
export const getEnvVariable = (key, defaultValue = '') => {
  const value = process.env[key];
  return value ? value : defaultValue;
};

/**
 * Fills an object (rawData) with environment variables
 * Definition example: %REACT_APP_AWS_API%
 * @param rawData - template, example:
 * {
 *  AUTH: {
        UserPoolId: '%REACT_APP_USER_POOL_ID%',
        ClientId: '%REACT_APP_USER_POOL_WEB_CLIENT_ID%'
      }
    }
 * @param resolver getEnvVariable
 * @returns Object - Object with environment variable values instead of keys
 */
export const fillInWithEnvVariables = (rawData, resolver) => {
  let data = JSON.stringify(rawData);
  const pattern = /%([^%]+)%/g;
  let match = pattern.exec(data);
  while (match) {
    match = match[0];
    data = data.replace(match, resolver(match.replace(pattern, '$1')));
    match = pattern.exec(data);
  }
  return JSON.parse(data);
};
