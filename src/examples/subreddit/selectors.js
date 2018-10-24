import { createSelector } from 'reselect';
import { selectPosts } from 'examples/reddit-api-redux/selectors';

const selectRedditName = (_, props) => props.match.params.srName

export const selectCurrentPosts = createSelector(
  [selectPosts, selectRedditName],
  (posts, redditName) => posts
    .filter(posts => posts.get('subreddit') === redditName)
    .toList()
)
