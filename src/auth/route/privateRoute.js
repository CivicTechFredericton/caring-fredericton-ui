import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuthDataContext from '../hooks/useAuthDataContext';

const PrivateRoute = ({ component, ...rest }) => {
  const Component = component;

  const { isSignedIn } = useAuthDataContext();

  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
