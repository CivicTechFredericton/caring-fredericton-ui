import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router';
import AuthApi from './api';

import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';
import SignInPage from './signin';
import SignUpPage from './signup';

const AuthDataContext = React.createContext([{}, () => {}]);

const AuthDataProvider = (props) => {
  const [state, setState] = useState({
    isInitialized: false,
    isSignedIn: false,
    user: null,
    landingPage: '/',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AuthApi.currentAuthenticatedUser();
      setState((state) => ({
        ...state,
        user: user.error ? null : user,
        isInitialized: true,
      }));
    };

    fetchUserData();
  }, []);

  if (!state.isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthDataContext.Provider value={[state, setState]}>
      {props.children}
      {!state.isSignedIn && (
        <>
          <Route path='/signin' component={SignInPage} />
          <Route path='/signup/:confirmEmail?' component={SignUpPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route
            path='/reset-password/:confirmEmail?'
            component={ResetPasswordPage}
          />
        </>
      )}
    </AuthDataContext.Provider>
  );
};

AuthDataProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthDataContext, AuthDataProvider };
