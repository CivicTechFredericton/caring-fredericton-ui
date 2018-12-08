import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import i18n from './utils/i18n';
import { I18nextProvider } from 'react-i18next';

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
        typography: {
            useNextVariants: true,
        }
    },
});


ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Router>
    </I18nextProvider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
