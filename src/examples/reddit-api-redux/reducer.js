import { handleActions } from 'redux-actions';
import { fetchSubReddits } from './actions';
import { fromJS } from 'immutable';
import { mergeNormalized } from 'utils/normalizr-utils';

export const REDUCER_NAME = 'reddit';
const SUCCESS_POSTFIX = 'SUCCESS';

const defaultHandler = handleActions(
  {
    [fetchSubReddits.SUCCESS]: (state, { payload }) =>
      state.set('subreddits', fromJS(payload)),
  },
  fromJS({})
);

export default (state, action) => {
  const nextState = defaultHandler(state, action);

  if (
    action.type.indexOf(SUCCESS_POSTFIX) > 0 &&
    action.meta &&
    action.meta.schema
  ) {
    return mergeNormalized(nextState, action);
  }

  return nextState;
};
