import React, { Component } from 'react';
import './index.scss';
import VerifyOrganization from '../verification';
import Login from '../auth/login';
import Home from '../home';
import Header from '../components/header';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isValidUser } from '../api/cognito';

class App extends Component {
  constructor() {
    super();
    this.state = {
      register: false,
    };
  }

  openRegister = () => {
    this.setState({ register: true });
  };

  closeRegister = () => {
    this.setState({ register: false });
  };

  render() {
    return (
      <div className='App'>
        <Header openRegister={this.openRegister} />

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
          <Route
            path='/'
            render={() => (
              <Home
                closeRegister={this.closeRegister}
                registerState={this.state.register}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
