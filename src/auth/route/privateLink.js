import React, { Fragment } from 'react';
import useAuthDataContext from '../hooks/useAuthDataContext';
import { Link } from 'react-router-dom';

const PrivateLink = ({ to, children }) => {
  const { isSignedIn } = useAuthDataContext();

  <Fragment>{isSignedIn ? <Link to={to}>{children}</Link> : null}</Fragment>;
};

export default PrivateLink;
