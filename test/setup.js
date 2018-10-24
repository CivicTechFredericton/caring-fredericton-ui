import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import enzymeMatchers from 'enzyme-matchers';

expect.extend(enzymeMatchers);
Enzyme.configure({ adapter: new Adapter() })
