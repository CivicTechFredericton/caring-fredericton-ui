import React from 'react';
import Post from './index';
import { shallow } from 'enzyme';

describe('Post', () => {
  it('should show the image provided', () => {
    const wrapper = shallow(<Post thumbnail={'https://google.ca'} />);
    expect(wrapper.find('img')).toHaveProp('src', 'https://google.ca');
  });
});
