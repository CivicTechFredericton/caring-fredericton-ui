import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../auth/route/privateRoute';
import DashboardPage from './pages/dashboard';
import HomePage from './pages/home';
import ValidationPage from './pages/validation';

function Router(props) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <PrivateRoute {...props} path='/dashboard' component={DashboardPage} />
      <PrivateRoute
        {...props}
        path='/validation/:orgId'
        component={ValidationPage}
      />
    </Switch>
  );
}

export default Router;
