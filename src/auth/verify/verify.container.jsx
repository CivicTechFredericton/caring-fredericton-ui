import hocs from 'common/common-hocs';
import Verify from './verify.presentation';
import { selectFormValues, selectUserName } from './selectors';

const mapState = (state, props) => ({
  formValues: selectFormValues(state),
  initialValues: {
    username: selectUserName(state, props),
  },
});

export default hocs({
  i18n: 'verify',
  redux: { mapState },
})(Verify);
