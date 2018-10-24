import React from 'react';
import Subreddit from './subreddit.presentation';
import { shallow } from 'enzyme';

const fetchPostsSpy = jest.fn();

const fakeMatch = {
  params: {
    srName: 'fake'
  }
};

describe('Subreddit', () => {
  beforeEach(() => {
    fetchPostsSpy.mockReset()
  });

  it('should fetch posts on updates', () => {
    const wrapper = shallow(<Subreddit
      fetchPosts={ fetchPostsSpy } match={ fakeMatch }
    />);

    wrapper.setProps({ match: { params: { srName: 'fake2' } } });
    wrapper.update();

    expect(fetchPostsSpy.mock.calls.length).toEqual(2);
    expect(fetchPostsSpy.mock.calls[1][0]).toEqual({ name: 'fake2' });
  });

  it('should fetch posts for the current subrredit on mount', () => {
    shallow(<Subreddit
      fetchPosts={ fetchPostsSpy } match={ fakeMatch }
    />);

    expect(fetchPostsSpy.mock.calls.length).toEqual(1);
    expect(fetchPostsSpy.mock.calls[0][0]).toEqual({ name: 'fake' });
  });
});
