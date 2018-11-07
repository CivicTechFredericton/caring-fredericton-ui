import React from 'react';
require('./index.scss');
// import history from 'routes/history';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

// const LoggedInControls = ({ t, user, logout }) => {
//   return (
//     <div>

//     </div>
//   )
// };

const Header = (props) => {
 const { user, t, logout,  classes } = props;
 // const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Caring Calendar
        </Typography>
      <Button className={classes.button} onClick={() => logout(user)}>{t('logout')}</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
};

{/* <Button type="Primary" value={t('Change Password')} onClick={() => history.push('/change-password')} />
<Button type="Primary" value={t('logout')} onClick={() => logout(user)} /> */}

// LoggedInControls.propTypes = Header.propTypes = {
Header.propTypes = {
  /* information about the user; containing their name and list of roles  */
  user: PropTypes.shape({}),
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  logout: PropTypes.func,
}
export default withStyles(styles)(Header);
//export default Header;


{/* <div className="headerBar">
    <div className="leftControls">
      <h4>
        {
          user ?
          t('header:welcome', { username: user.username }) :
          t('header:welcome_new_user')
        }
      </h4>
    </div>

    <div className="centerControls" >
     <img src={ logoSrc } />
    </div>

    <div className="rightControls">
      { user ? <LoggedInControls {...props} /> :null }
    </div>
  </div> */}