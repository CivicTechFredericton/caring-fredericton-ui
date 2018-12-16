import hocs from 'common/common-hocs';
import Login from './login.presentation';
import {
  selectNewPasswordRequired,
  selectAttributesRequired,
  selectMFARequired,
} from 'auth/cognito-redux/selectors';

const mapState = state => ({
  newPasswordRequired: selectNewPasswordRequired(state),
  attributesRequired: selectAttributesRequired(state),
  mfaRequired: selectMFARequired(state),
});

export default hocs({
  i18n: ['login', 'common'],
  redux: { mapState },
})(Login);
