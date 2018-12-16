import { REDUCER_NAME } from './reducer';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { selectEntities } from 'utils/normalizr-utils';

const selectReducer = state => state.get(REDUCER_NAME);

export const selectSubReddits = createSelector(
  [selectReducer],
  reducer => reducer.get('subreddits', List())
);

export const selectPosts = createSelector(
  [selectReducer],
  selectEntities('post')
);
