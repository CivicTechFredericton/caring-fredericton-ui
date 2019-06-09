import React, { Component } from 'react';
import './index.scss';
import VerifyOrganization from '../verification';
import Login from '../auth/login';
import Home from '../home';
import Header from '../components/header';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isValidUser } from '../api/cognito';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />

        <Switch>
          <Route
            path='/login/:orgId?'
            render={props =>
              !isValidUser() ? <Login {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/validation/:orgId'
            render={props =>
              isValidUser() ? (
                <VerifyOrganization {...props} />
              ) : (
                <Redirect to={`/login/${props.match.params.orgId}`} />
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
