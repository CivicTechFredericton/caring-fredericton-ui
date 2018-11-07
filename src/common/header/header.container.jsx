import hocs from 'common/common-hocs';
import Header from './header.presentation';
import { selectUser } from 'auth/cognito-redux/selectors';
import { logout } from 'auth/cognito-redux/actions';

const mapState = (state) => ({
  user: selectUser(state)
})

const mapDispatch = {
  logout
};

export default hocs({ i18n: 'header', router: true, redux: { mapState, mapDispatch } })(Header);
//export default hocs({ i18n: 'header', router: true})(Header);
