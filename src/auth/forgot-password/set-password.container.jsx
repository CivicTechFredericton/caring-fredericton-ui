import hocs from 'common/common-hocs';
import SetPassword from './set-password.presentation';
import { selectUserName } from './selectors';

const mapState = (state, props) => ({
  initialValues: {
    username: selectUserName(state, props)
  }
});

export default hocs({
  i18n: 'forgotPassword',
  redux: {mapState}
})(SetPassword);
