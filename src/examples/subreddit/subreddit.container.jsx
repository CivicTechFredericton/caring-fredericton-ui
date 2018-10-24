import hocs from 'common/common-hocs';
import { fetchPosts } from 'examples/reddit-api-redux/actions';
import { selectCurrentPosts } from './selectors';
import SubReddit from './subreddit.presentation';

const mapState = (state, props) => ({
  posts: selectCurrentPosts(state, props)
});

const mapDispatch = {
  fetchPosts: fetchPosts.trigger
};

export default hocs({ i18n: 'examples', redux: { mapState, mapDispatch } })(SubReddit);
