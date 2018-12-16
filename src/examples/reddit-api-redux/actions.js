import { createRoutine } from 'utils/saga-utils';
import * as schemas from './schemas';

export const uploadExample = createRoutine('UPLOAD_EXAMPLE');

export const fetchSubReddits = createRoutine('FETCH_SUB_REDDITS');

export const fetchPosts = createRoutine({
  name: 'FETCH_POSTS',
  metaCreator: { schema: schemas.posts },
});
