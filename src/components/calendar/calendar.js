import React, { useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import NewEvent from '../dialogs/events/create-event';
import EditEvent from '../dialogs/events/edit-event';
import EventCategoryFilter from '../common/filters/categories';

import 'react-big-calendar/lib/sass/styles.scss';
import './calendar.scss';
import useStyles from './styles';

import { useTranslation } from 'react-i18next';

import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import { getEventList } from '../../api/event';

const localizer = momentLocalizer(moment);
const DEFAULT_VIEW = Views.WEEK;
const VIEWS = [Views.DAY, Views.WEEK, Views.MONTH];

function AppCalendar() {
  const classes = useStyles();
  const { t } = useTranslation(['event', 'form']);
  const { isSignedIn, user } = useAuthDataContext();

  const [state, setState] = useState({
    currentDate: moment(),
    currentView: DEFAULT_VIEW,
    categories: new Set(),
    lastUpdated: moment(),
  });

  const [events, setEvents] = useState([]);

  const [eventDates, setEventDates] = useState({
    start: null,
    end: null,
  });

  const [eventState, setEventState] = useState({
    showDialog: false,
    dialogEvent: null,
  });

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [filterState, setFilterState] = useState({
    hideFilters: true,
    filterButtonLabel: t('form:lblShowFilters'),
  });

  const toggleShow = () => {
    let hideFilters = !filterState.hideFilters;
    let buttonLabel = hideFilters
      ? t('form:lblShowFilters')
      : t('form:lblHideFilters');

    setFilterState((filterState) => ({
      ...filterState,
      hideFilters: hideFilters,
      filterButtonLabel: buttonLabel,
    }));
  };

  // Set flag indicating the user can create a new event
  let canCreateEvents = false;

  // TODO: Update this check to check that the user has the correct permissions
  if (isSignedIn && user.organization_id) {
    canCreateEvents = true;
  }

  useEffect(() => {
    const updateEvents = async () => {
      const date = state.currentDate;
      const view = state.currentView;
      let start, end;

      if (view === Views.DAY) {
        start = moment(date).startOf('day');
        end = moment(date).endOf('day');
      } else if (view === Views.WEEK) {
        start = moment(date).startOf('week');
        end = moment(date).endOf('week');
      } else if (view === Views.MONTH) {
        start = moment(date).startOf('month').subtract(7, 'days');
        end = moment(date).endOf('month').add(7, 'days');
      }
      // TODO: Add the Agenda view
      /*else if (view == Views.AGENDA) {
        start = moment(date);
        end = moment(date).add(30, 'days');
      }*/

      const categoryList = Array.from(state.categories).join(',');
      const { success, data, errorMessage } = await getEventList(
        start,
        end,
        categoryList
      );
      if (success) {
        await transformEvent(data);
      } else {
        // TODO: Show error?
        console.log(errorMessage);
      }
    };

    const transformEvent = async (results) => {
      let input = [];
      if (results && results.length > 0) {
        results.map((result) => {
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
              start: startDate.toDate(),
              end: endDate.toDate(),
              desc: result.description,
            },
            result
          );

          input.push(event);

          return input;
        });
      }

      setEvents(input);
    };

    updateEvents();
  }, [state]);

  /**
   * Event details dialog handling methods
   */
  const openEventDialog = (event) => {
    setEventState((eventState) => ({
      ...eventState,
      showDialog: true,
      dialogEvent: event,
    }));
  };

  const closeEventDialog = () => {
    setEventState((eventState) => ({
      ...eventState,
      showDialog: false,
      dialogEvent: null,
    }));
  };

  // Category filter
  const handleCategoryChange = (event) => {
    setState((state) => ({
      ...state,
      categories: event,
    }));
  };

  const setLastUpdated = () => {
    setState((state) => ({
      ...state,
      lastUpdated: moment(),
    }));
  };

  /**
   * New/edit event dialog handling methods
   */
  const openCreateEvent = () => {
    setShowCreateEvent(true);
  };

  const closeCreateEvent = () => {
    setEventDates((eventDates) => ({
      ...eventDates,
      start: null,
      end: null,
    }));

    setShowCreateEvent(false);
  };

  /**
   * Calendar event handling Methods
   */
  const handleSelect = async ({ start, end }) => {
    if (canCreateEvents) {
      await setEventDates((eventDates) => ({
        ...eventDates,
        start: start,
        end: end,
      }));

      openCreateEvent();
    }
  };

  const onView = (view) => {
    setState((state) => ({
      ...state,
      currentView: view,
    }));
  };

  const onNavigate = (date, view) => {
    const newDate = moment(date);
    setState((state) => ({
      ...state,
      currentDate: newDate,
      currentView: view,
    }));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          {canCreateEvents ? (
            <Button
              variant='contained'
              color='secondary'
              className={classes.eventButton}
              startIcon={<AddOutlinedIcon />}
              onClick={openCreateEvent}
            >
              {t('event:lblNewEvent')}
            </Button>
          ) : null}
          <br />
          <br />
          <Grid item>
            <Button
              className={classes.filterButton}
              color='primary'
              onClick={() => {
                toggleShow();
              }}
            >
              {filterState.filterButtonLabel}
            </Button>
          </Grid>
          <Grid item hidden={filterState.hideFilters}>
            <EventCategoryFilter
              categories={state.categories}
              onCategoryChange={handleCategoryChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Calendar
            selectable
            resizable
            localizer={localizer}
            step={60}
            showMultiDayTimes
            events={events}
            date={state.currentDate.toDate()}
            views={VIEWS}
            defaultView={DEFAULT_VIEW}
            onView={onView}
            onNavigate={onNavigate}
            onSelectEvent={openEventDialog}
            onSelectSlot={handleSelect}
            style={{ height: '80vh' }}
          />
          <EditEvent
            show={eventState.showDialog}
            event={eventState.dialogEvent}
            handleClose={closeEventDialog}
            setLastUpdated={setLastUpdated}
          />
          <NewEvent
            show={showCreateEvent}
            start={eventDates.start}
            end={eventDates.end}
            handleClose={closeCreateEvent}
            setLastUpdated={setLastUpdated}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AppCalendar;
