import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import SuspenseView from '../../../suspense-view';
import DayOfWeekList from './days-list';
import EventCategoryList from './category-list';
import RecurrenceList from './recurrence-options';
import WeekOfMonthList from './weeks-list';

import moment from 'moment';
import MomentAdapter from '@material-ui/pickers/adapter/moment';

import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from '@material-ui/pickers';

import useStyles from './styles';

import useAuthDataContext from '../../../../auth/hooks/useAuthDataContext';
import { useTranslation } from 'react-i18next';

import { cancelEvent, createEvent, editEvent } from '../../../../api/event';

import {
  FORM_MODE_EDIT,
  VALUE_RECURRENCE_OPTION_NONE,
  VALUE_RECURRENCE_OPTION_MONTHLY,
} from '../../../common/constants';

export default function EventForm({
  mode,
  editEventData,
  start,
  end,
  show,
  handleClose,
  setLastUpdated,
}) {
  const [openCancel, setOpenCancel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [fullWidth] = useState(true);
  const [maxWidth] = useState('md');

  const [selectedStartDate, setSelectedStartDate] = useState(start);
  const [selectedEndDate, setSelectedEndDate] = useState(end);

  const { t, ready } = useTranslation([
    'event',
    'eventCategories',
    'eventRecurrences',
    'form',
  ]);
  const { user } = useAuthDataContext();
  const classes = useStyles();

  let isEditMode = mode === FORM_MODE_EDIT;

  //let showEditOptions = false;
  let userCanEditValues = true;

  let orgId = '';
  let eventId = '';

  const getOptionalValue = (name) => {
    if (name) {
      return name.toString();
    }

    return '1';
  };

  // Set the initial values
  const initialValues = {
    title: isEditMode ? editEventData.name : '',
    location: isEditMode ? editEventData.location : '',
    contactEmail: isEditMode ? editEventData.contact_email : '',
    description:
      isEditMode && editEventData.description ? editEventData.description : '',
    timezone: isEditMode ? editEventData.timezone : 'AST',
    num_occurrences: isEditMode
      ? editEventData.recurrence_details.num_recurrences
      : 1,
    week_of_month: isEditMode
      ? getOptionalValue(editEventData.recurrence_details.week_of_month)
      : '1',
    day_of_week: isEditMode
      ? getOptionalValue(editEventData.recurrence_details.day_of_week)
      : '1',
  };

  // Set the recurrence option flags
  const setRecurrenceOptionFlags = (recurrenceOption) => {
    const hideRecurrenceOptions =
      recurrenceOption !== VALUE_RECURRENCE_OPTION_NONE ? false : true;
    const hideMonthlyOptions =
      recurrenceOption === VALUE_RECURRENCE_OPTION_MONTHLY ? false : true;

    return {
      hideRecurrenceOptions: hideRecurrenceOptions,
      hideMonthlyOptions: hideMonthlyOptions,
    };
  };

  const clearState = {
    // Selected event categories
    categories: new Set(),

    // Selected recurrence options
    repeat: VALUE_RECURRENCE_OPTION_NONE,
    hideRecurrenceOptions: true,
    hideMonthlyOptions: true,
  };

  const setInitialState = () => {
    if (isEditMode) {
      orgId = editEventData.owner;
      eventId = editEventData.id;

      if (orgId !== user.organization_id) {
        userCanEditValues = false;
      }

      const isRecurring = editEventData.is_recurring;
      const recurrenceOption = isRecurring
        ? editEventData.recurrence_details.recurrence
        : VALUE_RECURRENCE_OPTION_NONE;
      const {
        hideRecurrenceOptions,
        hideMonthlyOptions,
      } = setRecurrenceOptionFlags(recurrenceOption);

      return {
        // Selected event categories
        categories: new Set(editEventData.categories),

        // Selected recurrence options
        repeat: recurrenceOption,
        hideRecurrenceOptions: hideRecurrenceOptions,
        hideMonthlyOptions: hideMonthlyOptions,
      };
    } else {
      return clearState;
    }
  };

  const [state, setState] = useState(setInitialState());

  /**
   * Methods for handling the delete confirmation dialog
   */
  const openConfirmDeleteModel = () => {
    setOpenDelete(true);
  };

  const closeConfirmDeleteModel = () => {
    setOpenDelete(false);
  };

  const handleConfirmYes = async (orgId, eventId) => {
    const { success, errorMessage } = await cancelEvent(orgId, eventId);
    if (success) {
      resetOptionsState();
      setLastUpdated();
      handleClose();
    } else {
      // TODO: Show error message
      console.log(errorMessage);
    }
  };

  const requiredTranslated = t('form:required');
  const EventSchema = Yup.object().shape({
    title: Yup.string().required(requiredTranslated),
    contactEmail: Yup.string()
      .email(t('form:invalidEmail'))
      .required(requiredTranslated),
    location: Yup.string().required(requiredTranslated),
  });

  /**
   * Methods for handling the confirmation dialog
   */
  const openConfirmCancelModel = () => {
    setOpenCancel(true);
  };

  const closeConfirmCancelModel = () => {
    setOpenCancel(false);
  };

  /**
   * Methods for handling the date changes
   */
  const handleStartDateChange = (inputDate) => {
    setSelectedStartDate(moment(inputDate));
  };

  const handleEndDateChange = (inputDate) => {
    setSelectedEndDate(moment(inputDate));
  };

  // Handle category check box list events
  const handleCategoryChange = (event) => {
    setState((state) => ({
      ...state,
      categories: event,
    }));
  };

  const resetOptionsState = () => {
    setState(clearState);
  };

  // Handle recurrence option change events
  const handleRecurrenceChange = (event) => {
    const recurrenceOption = event.target.value;
    const {
      hideRecurrenceOptions,
      hideMonthlyOptions,
    } = setRecurrenceOptionFlags(event.target.value);

    setState((state) => ({
      ...state,
      repeat: recurrenceOption,
      hideRecurrenceOptions: hideRecurrenceOptions,
      hideMonthlyOptions: hideMonthlyOptions,
    }));
  };

  /**
   * Submit changes
   */
  const onSubmit = async (values, actions) => {
    if (values && !values.isCancelButton) {
      // Add the start and end dates in the list of values
      values.start = moment(selectedStartDate).utc();
      values.end = moment(selectedEndDate).utc();

      // Add the selected categories
      values.categories = Array.from(state.categories);

      // Set the recurrence options
      let occurrenceType = () => {
        // Default to end after X occurrences
        return 'AFTER';
      };

      let repeatOption = state.repeat;
      if (repeatOption === VALUE_RECURRENCE_OPTION_NONE) {
        values.recurring = false;
      } else {
        values.recurring = true;

        let recurrenceDetails = {
          recurrence: repeatOption,
          occurrence_type: occurrenceType(),
          num_recurrences: values.num_occurrences,
        };

        if (repeatOption === VALUE_RECURRENCE_OPTION_MONTHLY) {
          recurrenceDetails.day_of_week = parseInt(values.day_of_week, 10);
          recurrenceDetails.week_of_month = parseInt(values.week_of_month, 10);
          recurrenceDetails.separation_count = 1; // default value
        }

        values.recurrenceDetails = recurrenceDetails;
      }

      // Call the event endpoint
      let result = null;

      if (mode === FORM_MODE_EDIT) {
        result = await editEvent(editEventData.owner, editEventData.id, values);
      } else {
        result = await createEvent(user.organization_id, values);
      }

      if (result.success) {
        resetOptionsState();
        setLastUpdated();
        handleClose();
      } else {
        if (result.statusCode === 422) {
          const messagesArray = _.get(result, 'errorData.messages', []);
          if ('date_range' in messagesArray) {
            actions.setStatus({ msg: t('event:errEndDateBeforeStartDate') });
          } else if ('daily_event_too_long' in messagesArray) {
            actions.setStatus({ msg: t('event:errDailyEventTooLong') });
          } else {
            actions.setStatus({ msg: t(result.errorMessage) });
          }
        } else {
          actions.setStatus({ msg: t(result.errorMessage) });
        }
      }
    } else {
      closeConfirmCancelModel();
      resetOptionsState();
      handleClose();
    }
  };

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={classes.root}>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={show}
        aria-labelledby='new-event-title'
      >
        <DialogContent>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={EventSchema}
          >
            {({ values, status, isSubmitting, isValid, dirty }) => (
              <Form>
                <Field
                  disabled={!userCanEditValues}
                  className={classes.longTextField}
                  type='text'
                  name='title'
                  label={t('event:lblTitle')}
                  margin='normal'
                  variant='outlined'
                  component={FormikTextField}
                  placeholder={t('event:lblTitle')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EditOutlinedIcon color='action' />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  disabled={!userCanEditValues}
                  multiline
                  rows={3}
                  className={classes.longTextField}
                  type='text'
                  name='description'
                  label={t('event:lblDescription')}
                  margin='normal'
                  component={FormikTextField}
                  placeholder={t('event:lblDescription')}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <DescriptionOutlinedIcon color='action' />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <Field
                      disabled={!userCanEditValues}
                      className={classes.textField}
                      type='text'
                      name='location'
                      label={t('event:lblAddress')}
                      margin='normal'
                      component={FormikTextField}
                      placeholder={t('event:lblAddress')}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AddLocationOutlinedIcon color='action' />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      disabled={!userCanEditValues}
                      className={classes.textField}
                      type='email'
                      name='contactEmail'
                      label={t('event:lblContactEmail')}
                      margin='normal'
                      component={FormikTextField}
                      placeholder={t('event:lblContactEmail')}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <ContactMailOutlinedIcon color='action' />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <div className={classes.margin}>
                  <EventCategoryList
                    isDisabled={!userCanEditValues}
                    categories={state.categories}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                      <InputLabel>{t('event:lblRecurrence')}</InputLabel>
                      <Field
                        select
                        disabled={isEditMode}
                        component={TextField}
                        name='repeat'
                        value={state.repeat}
                        onChange={handleRecurrenceChange}
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <RecurrenceList />
                      </Field>
                    </Grid>
                    <Grid
                      className={classes.spacer}
                      item
                      hidden={state.hideMonthlyOptions}
                    >
                      <Field
                        select
                        disabled={isEditMode}
                        component={FormikTextField}
                        name='week_of_month'
                        label={t('eventRecurrences:lblEvery')}
                        className={classes.weekOfMonthTextField}
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <WeekOfMonthList />
                      </Field>
                    </Grid>
                    <Grid
                      className={classes.spacer}
                      item
                      hidden={state.hideMonthlyOptions}
                    >
                      <Field
                        select
                        disabled={isEditMode}
                        component={FormikTextField}
                        name='day_of_week'
                        label={t('eventRecurrences:lblDay')}
                        className={classes.dayOfWeekTextField}
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <DayOfWeekList />
                      </Field>
                    </Grid>
                  </Grid>
                </div>
                <div
                  className={classes.margin}
                  hidden={state.hideRecurrenceOptions}
                >
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid className={classes.spacer} item>
                      <InputLabel>{t('event:lblEndsAfter')}</InputLabel>
                      <Field
                        disabled={isEditMode}
                        component={FormikTextField}
                        type='number'
                        name='num_occurrences'
                        className={classes.occurrenceTextField}
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: { min: 1, max: 10 },
                          endAdornment: (
                            <InputAdornment position='start'>
                              {t('event:lblOccurrences')}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.margin}>
                  <LocalizationProvider dateAdapter={MomentAdapter}>
                    <Grid container spacing={1}>
                      <Grid className={classes.dateField} item>
                        <DatePicker
                          disabled={isEditMode}
                          margin='normal'
                          label={t('event:lblStartDate')}
                          renderInput={(props) => <TextField {...props} />}
                          minDate={selectedStartDate}
                          value={selectedStartDate}
                          onChange={(date) => handleStartDateChange(date)}
                        />
                      </Grid>
                      <Grid className={classes.timeField} item>
                        <TimePicker
                          disabled={isEditMode}
                          margin='normal'
                          renderInput={(props) => <TextField {...props} />}
                          label={t('event:lblStartTime')}
                          value={selectedStartDate}
                          onChange={(newValue) =>
                            handleStartDateChange(newValue)
                          }
                        />
                      </Grid>
                      <Grid className={classes.dateField} item>
                        <DatePicker
                          disabled={isEditMode}
                          margin='normal'
                          label={t('event:lblEndDate')}
                          renderInput={(props) => <TextField {...props} />}
                          minDate={selectedStartDate}
                          value={selectedEndDate}
                          onChange={(date) => handleEndDateChange(date)}
                        />
                      </Grid>
                      <Grid className={classes.timeField} item>
                        <TimePicker
                          disabled={isEditMode}
                          margin='normal'
                          renderInput={(props) => <TextField {...props} />}
                          label={t('event:lblEndTime')}
                          value={selectedEndDate}
                          onChange={(newValue) =>
                            handleStartDateChange(newValue)
                          }
                        />
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </div>
                {status && status.msg && (
                  <Typography className={classes.error}>
                    {status.msg}
                  </Typography>
                )}
                <Divider />
                <Grid container justify='flex-end'>
                  <Grid item>
                    {!isEditMode ? (
                      <>
                        <Button
                          type='submit'
                          disabled={!isValid || isSubmitting}
                        >
                          {t('event:btnCreate')}
                        </Button>
                        <Button
                          variant='text'
                          color='inherit'
                          onClick={openConfirmCancelModel}
                          aria-label='Cancel'
                        >
                          {t('form:cancel')}
                        </Button>
                        <Dialog
                          open={openCancel}
                          onClose={closeConfirmCancelModel}
                          aria-labelledby='form-dialog-title'
                        >
                          <DialogContent>
                            {t('form:discardChanges')}
                          </DialogContent>
                          <DialogActions>
                            <Button
                              type='submit'
                              onClick={async () => {
                                values = {
                                  isCancelButton: true,
                                  isDirty: dirty,
                                };
                                onSubmit(values, {});
                              }}
                            >
                              {t('common:yes')}
                            </Button>
                            <Button onClick={closeConfirmCancelModel} autoFocus>
                              {t('common:no')}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : (
                      <>
                        {userCanEditValues ? (
                          <>
                            <Button
                              aria-label={t('event:btnUpdate')}
                              type='submit'
                              disabled={!isValid || isSubmitting}
                            >
                              {t('event:btnUpdate')}
                            </Button>
                            <Button
                              variant='text'
                              color='inherit'
                              onClick={openConfirmDeleteModel}
                              aria-label={t('event:btnDelete')}
                            >
                              {t('event:btnDelete')}
                            </Button>
                            <Dialog
                              open={openDelete}
                              onClose={closeConfirmDeleteModel}
                              aria-labelledby='form-dialog-title'
                            >
                              <DialogContent>
                                {t('event:lblDeleteMessage')}
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleConfirmYes.bind(
                                    this,
                                    orgId,
                                    eventId
                                  )}
                                >
                                  {t('common:yes')}
                                </Button>
                                <Button
                                  onClick={closeConfirmDeleteModel}
                                  autoFocus
                                >
                                  {t('common:no')}
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </>
                        ) : null}
                        <Button
                          variant='text'
                          color='inherit'
                          onClick={handleClose}
                        >
                          {t('form:close')}
                        </Button>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

EventForm.propTypes = {
  mode: PropTypes.string,
  editEventData: PropTypes.object,
  start: PropTypes.object,
  end: PropTypes.object,
  show: PropTypes.boolean,
  handleClose: PropTypes.func,
  setLastUpdated: PropTypes.func,
};
