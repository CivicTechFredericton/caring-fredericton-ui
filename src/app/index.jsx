import React from 'react';
import Login from 'auth/login';
import { ForgotPassword, SetPassword } from 'auth/forgot-password';
import Register from 'auth/register';
import UploadDemo from 'examples/upload-demo';
import Verify from 'auth/verify';
import Header from 'common/header';
import ChangePassword from 'auth/change-password';
import Dashboard from 'examples/dashboard';
import { Route, Switch } from 'react-router-dom';
import SecureRoute from 'routes/secure-route';
import styles from './index.scss';

const App = () => {
  return (<div className={ styles.appWrapper }>
    <Header />
    <Switch>
      <Route path="/login" component={ Login }/>
      <Route path="/forgot-password" component={ ForgotPassword }/>
      <Route path="/:username/set-password" component={ SetPassword }/>
      <Route path="/:username/verify" component={ Verify }/>
      <Route path="/register" component={ Register }/>
      <Route path="/upload" component={ UploadDemo }/>
      <SecureRoute path="/change-password" component={ ChangePassword }/>
      <SecureRoute component={ Dashboard } />
    </Switch>
  </div>);
};

export default App;
