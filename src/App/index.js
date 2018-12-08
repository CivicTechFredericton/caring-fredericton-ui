import React, { Component } from 'react';
import './index.scss';
import Home from '../Home';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Switch>
           <Route path="/" component={ Home }/>
        </Switch>
        </header>
      </div>
    );
  }
}

export default App;