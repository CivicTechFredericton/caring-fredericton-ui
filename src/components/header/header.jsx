import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography, Grid } from '@material-ui/core';
import { signOut } from '../../api/cognito';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Header = props => {
  const { t, classes } = props;
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
                Caring Calendar
              </Typography>
            </Grid>
            <Grid item>
              <Button className={classes.button} onClick={() => signOut()}>
                {t('logout')}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  /* information about the user; containing their name and list of roles  */
  user: PropTypes.shape({}),
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  logout: PropTypes.func,
};
export default withStyles(styles)(Header);
