import { createSelector } from 'reselect';

const selectReducer = state => state.get('router');

export const selectLocation = createSelector(
  [selectReducer],
  reducer => reducer.location
)
