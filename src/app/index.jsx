import React, { Component } from 'react';
import './index.scss';
import Home from '../home';
import Header from '../components/header';
import Login from '../auth/login';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
