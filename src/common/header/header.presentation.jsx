import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
import history from 'routes/history';
import logoSrc from './imgs/logo.png';

const LoggedInControls = ({ t, user, logout }) => {
  return (
    <div>
      <input type="button" value={ t('Change Password')} onClick={() => history.push('/change-password')} />
      <input type="button" value={ t('logout') } onClick={() => logout(user)}/>
    </div>
  )
};

const Header = (props) => {
  const { user, t } = props;

  return (<div className={ styles.headerBar }>
    <div className={ styles.leftControls }>
      <h4>
        {
          user ?
          t('header:welcome', { username: user.username }) :
          t('header:welcome_new_user')
        }
      </h4>
    </div>

    <div className={ styles.centerControls } >
     <img src={ logoSrc } />
    </div>

    <div className={ styles.rightControls }>
      { user ? <LoggedInControls {...props} /> :null }
    </div>
  </div>)
};

LoggedInControls.propTypes = Header.propTypes = {
  /* information about the user; containing their name and list of roles  */
  user: PropTypes.shape({ }),
  t: PropTypes.func.isRequired
}

export default Header;
