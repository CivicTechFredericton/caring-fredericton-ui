import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';
import { signOut, isValidSession } from '../../api/cognito';
import history from '../../history';

import logo from '../../logo.png';

const styles = {
  root: {
    flexGrow: 1,
    height: '10vh',
  },
  button: {
    color: 'white',
  },
  image: {
    width: '30px',
    marginRight: '20px',
  },
  imageGrid: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

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
              <Grid item className={this.props.classes.imageGrid}>
                <img className={this.props.classes.image} src={logo} />
                <span>{t('header.title')}</span>
              </Grid>
              <Grid item>
                {isValidSession() ? (
                  <Button
                    className={classes.button}
                    onClick={() => {
                      signOut();
                    }}
                  >
                    {t('authorize.logout')}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    {t('authorize.login')}
                  </Button>
                )}
              </Grid>
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
  myFunc: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Header);
