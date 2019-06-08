import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Filter from './filter';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import '../style/react-big-calendar.css';
import CreateEvent from './create-event/CreateEvent';
import RegisterOrganization from './register-organization/RegisterOrganization';
import { getSession, isValidUser } from '../api/cognito';
import { getUserDetails, listEventsForGuestUser } from '../api/endpoints';

const localizer = BigCalendar.momentLocalizer(moment);
const DEFAULT_VIEW = 'week';
const API_DATE_FORMAT = 'YYYY-MM-DD';
const API_TIME_FORMAT = 'HH:mm:ss';

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

const RegisterButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
  },
})(Button);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentDate: moment(),
      currentView: DEFAULT_VIEW,
      showEvent: false,
      showRegister: false,
      userDetails: {},
    };
  }

  componentDidMount() {
    this.updateTimes(this.state.currentDate, this.state.currentView);

    if (isValidUser()) {
      getSession(token => {
        getUserDetails(token.idToken, token.idToken.payload.sub).then(
          result => {
            const user = Object.assign(
              {},
              {
                administrator_id: result.id,
                adminFirstName: result.first_name,
                adminLastName: result.last_name,
                adminEmail: result.email,
              },
              result
            );

            this.setState({ userDetails: user });
          }
        );
      });
    }
  }

  getOrganizationId = () => {
    let userDetails = this.state.userDetails;
    return userDetails.organization_id;
  };

  organizationDetailsGroup = () => {
    const { t, classes } = this.props;

    let userDetails = this.state.userDetails;
    let orgId = userDetails.organization_id;
    let orgName = userDetails.organization_name;

    return (
      <>
        {orgId ? (
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
          >
            <Grid className={classes.filter} item>
              <Typography variant='h4'>{orgName}</Typography>
              <CreateEvent
                t={t}
                show={this.state.showEvent}
                handleClose={this.hideEventModal}
              />
              <Fab
                color='primary'
                onClick={this.showEventModal}
                aria-label='Add'
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        ) : (
          <Grid className={classes.filter} item>
            <RegisterOrganization
              t={t}
              show={this.state.showRegister}
              handleClose={this.hideRegisterModal}
              userDetails={this.state.userDetails}
            />
            <RegisterButton
              className={classes.button}
              onClick={() => {
                this.showRegisterModal();
              }}
            >
              {t('dialogs.registerOrganization')}
            </RegisterButton>
          </Grid>
        )}
      </>
    );
  };

  /**
   * Modal Actions
   */
  showEventModal = () => {
    this.setState({
      showEvent: true,
      showRegister: false,
    });
  };

  hideEventModal = () => {
    this.hideModal();
    this.setState({ showEvent: false });
  };

  showRegisterModal = () => {
    this.setState({
      showEvent: false,
      showRegister: true,
    });
  };

  hideRegisterModal = () => {
    this.hideModal();
    this.setState({ showRegister: false });
  };

  hideModal = () => {
    this.updateTimes(this.state.currentDate, this.state.currentView);
  };

  /**
   * BigCalendar event handling
   */
  onView = view => {
    this.setState({
      currentView: view,
    });

    this.updateTimes(this.state.currentDate, view);
  };

  onNavigate = (date, view) => {
    const newDate = moment(date);
    this.setState({
      currentDate: newDate,
    });

    this.updateTimes(newDate, view);
  };

  updateTimes = (date, view) => {
    let start, end;

    if (view === 'day') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day');
    } else if (view === 'week') {
      start = moment(date).startOf('week');
      end = moment(date).endOf('week');
    } else if (view === 'month') {
      start = moment(date)
        .startOf('month')
        .subtract(7, 'days');
      end = moment(date)
        .endOf('month')
        .add(7, 'days');
    }

    this.loadEvents(start.format(API_DATE_FORMAT), end.format(API_DATE_FORMAT));
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
                startDate.format(API_DATE_FORMAT) +
                  'T' +
                  startDate.format(API_TIME_FORMAT)
              ),
              end: new Date(
                endDate.format(API_DATE_FORMAT) +
                  'T' +
                  endDate.format(API_TIME_FORMAT)
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
            date={this.state.currentDate.toDate()}
            onView={this.onView}
            onNavigate={this.onNavigate}
            startAccessor='start'
            endAccessor='end'
          />
        </Grid>
        {isValidUser() && <Grid item>{this.organizationDetailsGroup()}</Grid>}
      </Grid>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Home);
