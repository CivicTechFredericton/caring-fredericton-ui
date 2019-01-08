import React, { Component } from 'react';
import './index.scss';
import Registration from '../registration';
import Header from '../components/header';
import Login from '../auth/login';
import Event from '../event';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
          <Route path='/event' component={Event} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
