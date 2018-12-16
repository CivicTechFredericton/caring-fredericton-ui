import React from 'react';
import Dashboard from './dashboard.presentation';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

const pushSpy = jest.fn();
const fetchSubRedditsSpy = jest.fn();
const mockSubreddits = fromJS(['test1', 'test2']);
const fakeMatch = { url: '/' };
const fakeLocation = { pathname: '/r/test1' };

describe('Dashboard', () => {
  beforeEach(() => {
    pushSpy.mockReset();
    fetchSubRedditsSpy.mockReset();
  });

  it('should fetch top subreddits on mount', () => {
    shallow(
      <Dashboard
        push={pushSpy}
        fetchSubReddits={fetchSubRedditsSpy}
        subReddits={mockSubreddits}
        match={fakeMatch}
        location={fakeLocation}
      />
    );

    expect(fetchSubRedditsSpy.mock.calls.length).toBe(1);
  });

  it('should show a select option for each subreddit; as well as an empty entry', () => {
    const wrapper = shallow(
      <Dashboard
        push={pushSpy}
        fetchSubReddits={fetchSubRedditsSpy}
        subReddits={mockSubreddits}
        match={fakeMatch}
        location={fakeLocation}
      />
    );

    const options = wrapper.find('option');

    expect(options.at(0)).toHaveProp('value', '');
    expect(options.at(1)).toHaveProp('value', 'test1');
    expect(options.at(2)).toHaveProp('value', 'test2');
  });

  it('should change the current location when the dropdown is changed', () => {
    const wrapper = shallow(
      <Dashboard
        push={pushSpy}
        fetchSubReddits={fetchSubRedditsSpy}
        subReddits={mockSubreddits}
        match={fakeMatch}
        location={fakeLocation}
      />
    );

    wrapper.find('select').simulate('change', { target: { value: 'test2' } });

    expect(pushSpy.mock.calls.length).toEqual(1);
    expect(pushSpy.mock.calls[0][0]).toEqual('/r/test2');
  });
});
