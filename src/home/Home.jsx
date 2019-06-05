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
import { listEventsForGuestUser } from '../api/endpoints';

const localizer = BigCalendar.momentLocalizer(moment);
const DEFAULT_VIEW = 'week';

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
      current_date: moment(),
      current_view: DEFAULT_VIEW,
      show: false,
    };
  }

  componentDidMount() {
    this.updateTimes(this.state.current_date, this.state.current_view);
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

  onView = view => {
    this.setState({
      current_view: view,
    });

    this.updateTimes(this.state.current_date, view);
  };

  onNavigate = (date, view) => {
    const new_date = moment(date);
    this.setState({
      current_date: new_date,
    });

    this.updateTimes(new_date, view);
  };

  // updateTimes (date = this.state.current_date, view = this.state.current_view) {
  updateTimes = (date, view) => {
    let start, end;

    if (view === 'day') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day');
    } else if (view === 'week') {
      start = moment(date).startOf('week');
      console.log('Test', moment(date));
      end = moment(date).endOf('week');
    } else if (view === 'month') {
      start = moment(date)
        .startOf('month')
        .subtract(7, 'days');
      end = moment(date)
        .endOf('month')
        .add(7, 'days');
    }

    this.loadEvents(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
  };

  loadEvents = (start, end) => {
    const categories = '';
    listEventsForGuestUser(start, end, categories).then(results => {
      if (results.length > 0) {
        let input = [];
        results.map(result => {
          const startDate = moment(result.start_date + ' ' + result.start_time)
            .utc('YYYY-MM-DD HH:mm:ss')
            .local();

          const endDate = moment(result.end_date + ' ' + result.end_time)
            .utc('YYYY-MM-DD HH:mm:ss')
            .local();

          const event = Object.assign(
            {},
            {
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
            },
            result
          );

          input.push(event);
        });
        this.setState({ events: input });
      }
    });
  };

  render() {
    const { t, classes } = this.props;
    console.log('state', this.state);
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
            views={['day', 'week', 'month']}
            date={this.state.current_date.toDate()}
            onView={this.onView}
            onNavigate={this.onNavigate}
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
