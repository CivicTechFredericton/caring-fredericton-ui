import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Typography } from '@material-ui/core';
import { signOut, isValidSession } from '../../api/cognito';
import { getUserDetails } from '../../utils/localStorage';

import history from '../../history';
import logo from '../../logo.png';
import styles from './style';

class Header extends React.Component {
  authButtonGroup = validSession => {
    const { t, classes } = this.props;

    return (
      <div>
        {validSession ? (
          <div>
            {!getUserDetails().organization_id && (
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

    let validSession = isValidSession();

    let orgName = '';
    if (validSession) {
      orgName = getUserDetails().organization_name;
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
                      alt={t('common:logo_icon')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {orgName && (
                <Grid item>
                  <Typography variant='h6'>{orgName}</Typography>
                </Grid>
              )}
              <Grid item>{this.authButtonGroup(validSession)}</Grid>
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
