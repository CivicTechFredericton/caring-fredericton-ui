import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography, Grid } from '@material-ui/core';
import { signOut } from '../../api/cognito';

const styles = {
  root: {
    flexGrow: 1,
    height: '10vh',
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
              <Grid item>
                <Typography variant='h6' color='inherit'>
                  {t('headerTitle', 'Caring Calendar')}
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.button} onClick={() => signOut()}>
                  {t('logout', 'Log Out')}
                </Button>
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
};

export default withStyles(styles)(Header);
