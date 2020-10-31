import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider } from '@material-ui/core/styles';
import materialAppTheme from './styles/materialAppTheme';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

const AppWrapper = ({ children }) => (
  <MuiThemeProvider theme={materialAppTheme}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </MuiThemeProvider>
);

AppWrapper.propTypes = {
  children: PropTypes.node,
};

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
