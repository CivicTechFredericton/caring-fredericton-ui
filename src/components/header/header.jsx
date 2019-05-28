import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { signOut, isValidSession } from '../../api/cognito';
import history from '../../history';
import logo from '../../logo.png';

import styles from './style';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  authButtonGroup = () => {
    const { t, classes } = this.props;
    return (
      <>
        {isValidSession() ? (
          <Button
            className={classes.button}
            onClick={() => {
              signOut();
            }}
          >
            {' '}
            {t('authorize.logout')}{' '}
          </Button>
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
      </>
    );
  };

  render() {
    const { t, classes } = this.props;

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
                    <img className={classes.image} src={logo} />
                  </Grid>
                  <Grid item>{t('header.title')}</Grid>
                </Grid>
              </Grid>
              <Grid item>{this.authButtonGroup()}</Grid>
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
};

export default withStyles(styles, { withTheme: true })(Header);
