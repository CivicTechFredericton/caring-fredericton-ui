import SecureRoute from './secure-route.presentation';
import { selectUser } from 'auth/cognito-redux/selectors';
import { selectLocation } from '../history/selectors';
import hocs from 'common/common-hocs';

const mapState = (state, props) => ({
  user: selectUser(state, props),
  // ensures that the secure route is aware of route changes
  location: selectLocation(state, props)
});

export default hocs({ redux: { mapState }})(SecureRoute);
