import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { Router } from 'react-router-dom';
import history from './history';

import { MuiThemeProvider } from '@material-ui/core/styles';
import materialAppTheme from './styles/materialAppTheme';

import i18n from './utils/i18n';
import { I18nextProvider } from 'react-i18next';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router history={history}>
      <MuiThemeProvider theme={materialAppTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
