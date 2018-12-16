import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import React from 'react';
import App from 'app';
import i18n from 'utils/i18n';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import { VERSION, RELEASE } from 'APP_CONFIG';
import { Provider } from 'react-redux';
import history from 'routes/history';
import createStore from './redux/store';
import { currentUser } from 'auth/cognito-redux/api';
import { fromJS } from 'immutable';
import './index.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { blue, grey} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#039be5',
      dark: '#006db3',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffb04c',
      main: '#f57f17',
      dark: '#bc5100',
      contrastText: '#000000',
    },
  },
});

/*
  Since we need to wait for the cognito chunk to load;
  we need to wait for the store to build
*/
const asyncStore = currentUser().then(user => {
  return createStore(fromJS({ cognito: { user } }));
});

const renderApp = Component => {
  asyncStore.then(store => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ConnectedRouter history={history}>
              <MuiThemeProvider theme={theme}>
                <Component />
              </MuiThemeProvider>
            </ConnectedRouter>
          </I18nextProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextRoot = require('./app').default;
    renderApp(NextRoot);
  });
}

window.__APP_INFORMATION = {
  version: VERSION,
  release: RELEASE,
};
