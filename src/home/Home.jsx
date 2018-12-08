import React, { Component } from 'react';
import logo from '../logo.svg';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="Home">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
      </div>
    );
  }
}

export default Home;