import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Typography } from '@material-ui/core';
import { signOut, isValidUser } from '../../api/cognito';
import { getUserDetails } from '../../utils/localStorage';

import history from '../../history';
import logo from '../../logo.png';
import styles from './styles';

class Header extends React.Component {
  // TODO: Code to allow async/await rendering of the component
  /*constructor(props) {
  super(props);

  this.state = {
    validSession: false,
  };
}

async componentDidMount() {
  let validSession = await isValidSession();
  this.setState({ validSession: validSession });
}*/

  authButtonGroup = (validSession, organizationId) => {
    const { t, classes } = this.props;

    let path = window.location.pathname;
    let pathSegments = path.split('/');
    let pathOne = pathSegments[1];
    let showHomeButton = pathOne === 'Login';
    console.log(showHomeButton);

    return (
      <div>
        {validSession ? (
          <div>
            {!organizationId && (
              <Button
                className={classes.button}
                onClick={() => {
                  this.props.openRegister();
                }}
              >
                {t('dialogs.registerOrganization')}
              </Button>
            )}
            <Button
              className={classes.button}
              onClick={() => {
                signOut();
              }}
            >
              {' '}
              {t('authorize.logout')}{' '}
            </Button>
          </div>
        ) : (
          <Button
            className={classes.button}
            onClick={() => {
              history.push('/Login');
            }}
          >
            {' '}
            {t('authorize.login')}{' '}
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { t, classes } = this.props;

    let validSession = isValidUser();

    let orgId = '';
    if (validSession) {
      let userDetails = getUserDetails();
      orgId = userDetails.organization_id;
    }

    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.imageGrid} item>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                >
                  <Grid item>
                    <img
                      className={classes.image}
                      src={logo}
                      alt={t('common:logoIcon')}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>
                      {t('common:lblCaringCalendar')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>{this.authButtonGroup(validSession, orgId)}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.any,
  openRegister: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Header);
