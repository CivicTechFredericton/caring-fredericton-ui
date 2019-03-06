import React, { Component } from 'react';
import './index.scss';
import Registration from '../registration';
import Header from '../components/header';
import Login from '../auth/login';
import ChangePassword from '../auth/ChangePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';

class App extends Component {
  siblingAFunc() {
    console.log('header');
  }
  render() {
    return (
      <div className='App'>
        <Header myFunc={this.siblingAFunc} />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/ChangePassword' component={ChangePassword} />
          <Route path='/ForgotPassword' component={ForgotPassword} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route
            path='/registration'
            render={props => <Registration {...props} validation={false} />}
          />
          <Route
            path='/validation'
            render={props => <Registration {...props} validation={true} />}
          />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
