import rootReducer from 'redux/root-reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import normalizrMiddleware from 'redux-normalizr-middleware';
import { Map } from 'immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import history from 'routes/history';
import { routinesWatcherSaga } from 'redux-saga-routines';

const sagaCtx = require.context('../../', true, /sagas.js/);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware, normalizrMiddleware(), routerMiddleware(history)
];

const defaultSagas = [
  ...sagaCtx.keys().map(key => sagaCtx(key).default),
  routinesWatcherSaga
];

export default (defaultState = Map()) => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    defaultState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  defaultSagas.map(sagaMiddleware.run);

  return store;
};
