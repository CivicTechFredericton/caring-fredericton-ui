import React from 'react';
import { storiesOf } from '@storybook/react';
import Post from 'examples/post';

export default storiesOf('Post', module)
  .add('No thumbnail', () => {
    return (<Post
      title='Empty post'
    />);
  })
  .add('Extra long title', () => {
    return (<Post
      title='This is some really long text that will have to be truncated'
    />);
  })
  .add('Thumbnail', () => {
    return (<Post
      thumbnail='https://pbs.twimg.com/profile_images/615993481685794816/vMhSLk-2.jpg'
      title='PUPPIES!'
    />);
  })
