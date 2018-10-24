import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const SecureRoute = ({ user, component, ...rest }) => {
  const Component = component;
  return (<Route {...rest} render={
    props => {
      return (user ?
        (<Component {...props}/>) :
        (<Redirect to={{ pathname: '/login'}}/>)
      )
    }
  }/>);
};

SecureRoute.propTypes = {
  user: PropTypes.any,
  component: PropTypes.any.isRequired
};

export default SecureRoute;
