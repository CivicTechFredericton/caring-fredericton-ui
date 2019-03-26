import React, { Component } from 'react';
import './index.scss';
import Registration from '../registration';
import Header from '../components/header';
import Login from '../auth/login';
import ChangePassword from '../auth/ChangePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home';
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
            path='/ChangePassword'
            render={props =>
              isValidUser() ? (
                <ChangePassword {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/ForgotPassword'
            render={props =>
              isValidUser() ? (
                <ForgotPassword {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/ResetPassword'
            render={props =>
              isValidUser() ? <ResetPassword {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/registration'
            render={props =>
              isValidUser() ? (
                <Registration {...props} validation={false} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/validation'
            render={props =>
              isValidUser() ? (
                <Registration {...props} validation={true} />
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
