import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';
import Filter from './filter';

import '../style/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [];

const styles = () =>
  createStyles({
    root: {
      padding: 30,
    },
    filter: {
      width: 250,
    },
  });

// const ThemeContext = React.createContext('light');

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid className={classes.filter} item>
          <Typography>filter</Typography>
          <Filter />
        </Grid>
        <Grid item>
          <BigCalendar
            style={{ height: 500, width: 750 }}
            localizer={localizer}
            events={myEventsList}
            startAccessor='start'
            endAccessor='end'
          />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Home);
