import React from 'react';
import PropTypes from 'prop-types';

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

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
