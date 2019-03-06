import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';
import Filter from './filter';

import '../style/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

const events = {
  objects: [
    {
      id: '1',
      name: 'Supper',
      owner: 'United Church',
      description: 'Supper in Fredericton',
      categories: ['meals'],
      start_date: '2019-01-29',
      end_date: '2019-01-29',
      start_time: '16:00',
      end_time: '18:00',
    },
    {
      id: '2',
      name: 'Programing Class',
      owner: 'United Church',
      description: 'JavaScript for Beginners',
      categories: ['education'],
      start_date: '2019-01-27',
      end_date: '2019-01-27',
      start_time: '12:00:00',
      end_time: '16:00:00',
    },
    {
      id: '3',
      name: 'Lunch',
      owner: 'United Church',
      description: 'Lunch in Fredericton',
      categories: ['meals'],
      start_date: '2019-01-28',
      end_date: '2019-01-28',
      start_time: '11:00:00',
      end_time: '14:00:00',
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }
  componentDidMount() {
    let input = [];

    events.objects.map(result => {
      input.push({
        title: result.name,
        allDay: false,
        start: new Date(result.start_date + 'T' + result.start_time),
        end: new Date(result.end_date + 'T' + result.end_time),
      });
    });
    this.setState({ events: input });
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
            step={60}
            events={this.state.events}
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
