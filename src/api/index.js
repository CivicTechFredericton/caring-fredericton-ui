import { API_URL } from 'APP_CONFIG';
import { getCurrentUserSession } from 'auth/cognito-redux/api';
var Promise = require('es6-promise').Promise;

const request = ({ endpoint, body, method = 'GET' }) => {
  return getCurrentUserSession().then(session => {
    const headers = new Headers();
    headers.append('Authorization', session.idToken.jwtToken);
    return fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? body : null,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  });
};
