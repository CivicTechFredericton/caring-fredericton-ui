import { combineReducers } from 'redux-immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { routerReducer } from 'react-router-redux';
import { Map } from 'immutable';

const reducerCtx = require.context('../../', true, /reducer.js/);

const reducers = Map(
  reducerCtx.keys().map(item => {
    const res = reducerCtx(item);
    return [res.REDUCER_NAME, res.default];
  })
).toJS();

export default combineReducers({
  router: routerReducer,
  form: reduxFormReducer,
  ...reducers,
});
