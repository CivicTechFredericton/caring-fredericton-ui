import React from 'react';
import Login from 'auth/login';
import { ForgotPassword, SetPassword } from 'auth/forgot-password';
import Register from 'auth/register';
import UploadDemo from 'examples/upload-demo';
import Verify from 'auth/verify';
import Header from 'common/header';
import ChangePassword from 'auth/change-password';
import { Route, Switch } from 'react-router-dom';
import SecureRoute from 'routes/secure-route';
import styles from './index.scss';
import Home from 'components/Home';
import Registration from 'components/Registration';

const App = () => {
  return (<div className={ styles.appWrapper }>
    <Header />
    <Switch>
      <Route path="/login" component={ Login }/>
      <Route path="/register" component={ Register }/>
      <Route path="/forgot-password" component={ ForgotPassword }/>
      <SecureRoute path="/:username/set-password" component={ SetPassword }/>
      <SecureRoute path="/:username/verify" component={ Verify }/>
      <SecureRoute path="/upload" component={ UploadDemo }/>
      <SecureRoute path="/home" component={ Home }/>
      <SecureRoute path="/registration" component={ Registration }/>
      <SecureRoute path="/change-password" component={ ChangePassword }/>
      <SecureRoute path="/" component={ Home } />
    </Switch>
  </div>);
};

export default App;
