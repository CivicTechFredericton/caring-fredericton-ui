import React, { Component } from 'react';
import './index.scss';
import VerifyOrganization from '../verification';
import Login from '../auth/login';
import Home from '../home';
import Header from '../components/header';
import ChangePassword from '../auth/ChangePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isValidUser } from '../api/cognito';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />

        <Switch>
          <Route
            path='/login'
            render={props =>
              !isValidUser() ? <Login {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/changePassword'
            render={props =>
              isValidUser() ? (
                <ChangePassword {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/forgotPassword'
            render={props =>
              isValidUser() ? (
                <ForgotPassword {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/resetPassword'
            render={props =>
              isValidUser() ? <ResetPassword {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/validation'
            render={props =>
              isValidUser() ? (
                <VerifyOrganization {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
