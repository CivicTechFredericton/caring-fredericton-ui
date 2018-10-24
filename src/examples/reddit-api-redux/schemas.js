import { schema } from 'normalizr';

export const post = new schema.Entity('post');
export const posts = new schema.Array(post);
