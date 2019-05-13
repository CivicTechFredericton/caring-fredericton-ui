import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';
import Filter from './filter';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import '../style/react-big-calendar.css';
import CreateEvent from './create-event/CreateEvent';
import { isValidUser } from '../api/cognito';
import { getEvent } from '../api/endpoints';
import { convertDateToUTC } from '../utils/date';

const localizer = BigCalendar.momentLocalizer(moment);

// const events = {
//   objects: [
//     {
//       id: '1',
//       name: 'Supper',
//       owner: 'United Church',
//       description: 'Supper in Fredericton',
//       categories: ['meals'],
//       start_date: '2019-01-29',
//       end_date: '2019-01-29',
//       start_time: '16:00',
//       end_time: '18:00',
//     },
//     {
//       id: '2',
//       name: 'Programing Class',
//       owner: 'United Church',
//       description: 'JavaScript for Beginners',
//       categories: ['education'],
//       start_date: '2019-01-27',
//       end_date: '2019-01-27',
//       start_time: '12:00:00',
//       end_time: '16:00:00',
//     },
//     {
//       id: '3',
//       name: 'Lunch',
//       owner: 'United Church',
//       description: 'Lunch in Fredericton',
//       categories: ['meals'],
//       start_date: '2019-01-28',
//       end_date: '2019-01-28',
//       start_time: '11:00:00',
//       end_time: '14:00:00',
//     },
//   ],
// };

const styles = () =>
  createStyles({
    root: {
      padding: 30,
    },
    filter: {
      width: 200,
    },
    fab: {
      position: 'absolute',
      bottom: '50px',
      right: '50px',
    },
  });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      show: false,
    };
  }

  componentDidMount() {
    this.loadEvents();
    convertDateToUTC();
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.loadEvents();
    this.setState({ show: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  loadEvents = () => {
    // getSession(vals => {
    const start = '2019-01-01';
    const end = '2019-12-29';
    const categories = '';
    getEvent(start, end, categories).then(results => {
      if (results.length > 0) {
        let input = [];
        results.map(result => {
          const startDate = moment(result.start_date + ' ' + result.start_time)
            .utc('YYYY-MM-DD HH:mm:ss')
            .local();

          const endDate = moment(result.end_date + ' ' + result.end_time)
            .utc('YYYY-MM-DD HH:mm:ss')
            .local();

          input.push({
            title: result.name,
            allDay: false,
            start: new Date(
              startDate.format('YYYY-MM-DD') +
                'T' +
                startDate.format('HH:mm:ss')
            ),
            end: new Date(
              endDate.format('YYYY-MM-DD') + 'T' + endDate.format('HH:mm:ss')
            ),
          });
        });
        this.setState({ events: input });
      }
    });
    // });
  };

  render() {
    const { t, classes } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid className={classes.filter} item>
          <Typography>{t('home.filterTitle')}</Typography>
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
        {isValidUser() && (
          <Grid className={classes.filter} item>
            <CreateEvent
              t={t}
              show={this.state.show}
              handleClose={this.hideModal}
            />
            <Fab
              color='primary'
              onClick={this.showModal}
              aria-label='Add'
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </Grid>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Home);
