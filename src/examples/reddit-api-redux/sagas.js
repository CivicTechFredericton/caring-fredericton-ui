import { fetchTopSubrredits, fetchRedditPosts, uploadExample } from './api';
import * as actions from './actions';
import { takeLatestRoutine } from 'utils/saga-utils';
import { select } from 'redux-saga/effects';
import { selectPosts } from './selectors';

const onFetchSubreddits = () => {
  return fetchTopSubrredits();
}

const onUploadExample = ({ payload }) => {
  return uploadExample(payload.toJS());
}

function* onFetchPosts({ payload }) {
  // These lines prevent posts from being fetched again if we already have any
  // post for the subreddit we're looking at. This reduces API calls
  const posts = yield select(selectPosts);
  const existingPost = posts.find(post => post.get('subreddit') === payload.name);

  return existingPost ? {} : yield fetchRedditPosts(payload);
}

export default function* () {
  yield takeLatestRoutine(actions.fetchSubReddits, onFetchSubreddits);
  yield takeLatestRoutine(actions.fetchPosts, onFetchPosts);
  yield takeLatestRoutine(actions.uploadExample, onUploadExample)
}
