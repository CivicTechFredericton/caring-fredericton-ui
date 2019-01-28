import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';
import Filter from './filter';

import '../style/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [
  {
    title: 'Bake Sale',
    allDay: false,
    start: new Date(2019, 0, 27, 12, 0), // 10.00 AM
    end: new Date(2019, 0, 27, 16, 0), // 2.00 PM
  },
  {
    title: 'Lunch',
    allDay: false,
    start: new Date('2019', '0', '28', '12', '0'), // 10.00 AM
    end: new Date(2019, 0, 28, 15, 0), // 2.00 PM
  },
];

const events = {
  objects: [
    {
      id: 'string',
      name: 'string',
      owner: 'string',
      description: 'string',
      categories: ['string'],
      start_date: 'string',
      end_date: 'string',
      start_time: 'string',
      end_time: 'string',
    },
  ],
};

const styles = () =>
  createStyles({
    root: {
      padding: 30,
    },
    filter: {
      width: 200,
    },
  });

// const ThemeContext = React.createContext('light');

class Home extends React.Component {
  componentDidMount() {
    console.log(events);
  }
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
          <Typography>Event Category</Typography>
          <Filter />
        </Grid>
        <Grid item>
          <BigCalendar
            style={{ height: 500, width: 800 }}
            localizer={localizer}
            step={30}
            events={myEventsList}
            defaultView='week'
            views={['month', 'week']}
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
