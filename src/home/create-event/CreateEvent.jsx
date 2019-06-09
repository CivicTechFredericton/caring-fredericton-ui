import React from 'react';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SimpleEmailRegex } from 'Utils/regex';

import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  createStyles,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';

import { createEvent } from '../../api/endpoints';
import { getSession } from '../../api/cognito';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// TODO: Make into constant values used with Home and CreateEvent
const API_DATE_FORMAT = 'YYYY-MM-DD';
const API_TIME_FORMAT = 'HH:mm:ss';
const REPEAT_OPTION_NONE = 'NONE';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: 350,
  },
  occurrenceTextField: {
    width: 215,
  },
  checkBoxField: {
    width: 120,
  },
  spacer: {
    paddingRight: 20,
  },
  button: {
    marginLeft: '40%',
    marginTop: 30,
    color: 'white',
    fontSize: '14px',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 100,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

class Event extends React.Component {
  default_state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md',
    repeat: REPEAT_OPTION_NONE,
    hideRecurrenceOptions: true,

    // Category options
    categories: new Set(),
    meals: false,
    laundry: false,
    social: false,
    showers: false,
    education: false,
    health: false,
    hairCuts: false,
    taxes: false,
    faith: false,
  };

  constructor(props) {
    super(props);

    this.state = this.default_state;
  }

  handleDialogClose = () => {
    this.setState(this.default_state);
    this.props.handleClose();
  };

  // Handle category check box list events
  handleCheckboxChange = name => event => {
    let checked = event.target.checked;
    let value = event.target.value;
    let categories = this.state.categories;

    if (checked) {
      categories.add(value);
    } else {
      categories.delete(value);
    }

    this.setState({
      [name]: checked,
      categories: categories,
    });
  };

  // Handle recurrence option change events
  handleRecurrenceChange = event => {
    let recurrenceOption = event.target.value;
    let hideRecurrenceOptions =
      recurrenceOption !== REPEAT_OPTION_NONE ? false : true;

    this.setState({
      repeat: event.target.value,
      hideRecurrenceOptions: hideRecurrenceOptions,
    });
  };

  transformEvent = event => {
    // Set the required fields
    let categoriesSet = this.state.categories;
    if (categoriesSet.size === 9) {
      categoriesSet.clear();
    }

    let categoriesList = Array.from(categoriesSet);

    let startDateTime = moment(event.start_date + ' ' + event.start_time).utc();

    let endDateTime = moment(event.end_date + ' ' + event.end_time).utc();

    let eventObj = {
      name: event.name,
      description: event.description,
      contact_email: event.contactEmail,
      categoriesList,
      start_date: startDateTime.format(API_DATE_FORMAT),
      end_date: endDateTime.format(API_DATE_FORMAT),
      start_time: startDateTime.format(API_TIME_FORMAT),
      end_time: endDateTime.format(API_TIME_FORMAT),
      timezone: 'AST',
    };

    // Show the following options in the dialog
    // day_of_week, week_of_month

    // Set the recurrence options
    const occurrenceType = () => {
      // Default to end after X occurrences
      return 'AFTER';
    };

    let repeatOption = this.state.repeat;
    if (repeatOption === REPEAT_OPTION_NONE) {
      eventObj.is_recurring = false;
    } else {
      eventObj.is_recurring = true;

      let recurrence_details = {
        recurrence: repeatOption,
        occurrence_type: occurrenceType(),
        num_recurrences: event.num_occurrences,
        //day_of_week: 1,
        //week_of_month: 1,
        //separation_count: 1, // default value
      };

      eventObj.recurrence_details = recurrence_details;
    }

    return eventObj;
  };

  render() {
    const { t, classes, userDetails } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.show}
          aria-labelledby='form-dialog-title'
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Grid item className={classes.flex}>
                {t('dialogs.createEvent')}
              </Grid>
              <IconButton
                color='inherit'
                onClick={this.handleDialogClose}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='center'
            >
              <Formik
                initialValues={{
                  name: '',
                  description: '',
                  categories: 'social',
                  contactEmail: '',
                  start_date: '',
                  end_date: '',
                  start_time: '',
                  end_time: '',
                  repeat: REPEAT_OPTION_NONE,
                }}
                validate={values => {
                  let errors = {};

                  if (!values.name) {
                    errors.name = t('common.required');
                  }

                  if (!values.contactEmail) {
                    errors.contactEmail = t('common.required');
                  } else if (!SimpleEmailRegex.test(values.contactEmail)) {
                    errors.contactEmail = t('error.invalidEmail');
                  }

                  // TODO: Check start and end values are valid
                  if (!values.start_date) {
                    errors.start_date = t('common.required');
                  }

                  if (!values.end_date) {
                    errors.end_date = t('common.required');
                  }

                  if (!values.start_time) {
                    errors.start_time = t('common.required');
                  }

                  if (!values.end_time) {
                    errors.end_time = t('common.required');
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  getSession(vals => {
                    let valuesTransform = this.transformEvent(values);

                    createEvent(
                      vals.idToken,
                      userDetails.organization_id,
                      valuesTransform
                    ).then(() => {
                      setSubmitting(false);
                      this.handleDialogClose();
                    });
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid
                      container
                      direction='row'
                      justify='flex-start'
                      alignItems='center'
                    >
                      <Grid className={classes.spacer} item>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='text'
                            name='name'
                            label={t('event.name')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('event.name')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            multiline
                            rows='4'
                            component={TextField}
                            type='text'
                            name='description'
                            label={t('event.description')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('event.description')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='email'
                            name='contactEmail'
                            label={t('event.contactEmail')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('event.contactEmail')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <FormLabel component='legend'>
                            {t('event.categories')}
                          </FormLabel>
                          <FormControl
                            component='fieldset'
                            className={classes.formControl}
                          >
                            <FormGroup row>
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.meals}
                                    onChange={this.handleCheckboxChange(
                                      'meals'
                                    )}
                                    value='meals'
                                  />
                                }
                                label={t('filter.meals')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.laundry}
                                    onChange={this.handleCheckboxChange(
                                      'laundry'
                                    )}
                                    value='laundry'
                                  />
                                }
                                label={t('filter.laundry')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.social}
                                    onChange={this.handleCheckboxChange(
                                      'social'
                                    )}
                                    value='social'
                                  />
                                }
                                label={t('filter.social')}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.showers}
                                    onChange={this.handleCheckboxChange(
                                      'showers'
                                    )}
                                    value='showers'
                                  />
                                }
                                label={t('filter.showers')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.education}
                                    onChange={this.handleCheckboxChange(
                                      'education'
                                    )}
                                    value='education'
                                  />
                                }
                                label={t('filter.education')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.health}
                                    onChange={this.handleCheckboxChange(
                                      'health'
                                    )}
                                    value='health'
                                  />
                                }
                                label={t('filter.health')}
                              />
                            </FormGroup>
                            <FormGroup row>
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.hairCuts}
                                    onChange={this.handleCheckboxChange(
                                      'hairCuts'
                                    )}
                                    value='hairCuts'
                                  />
                                }
                                label={t('filter.hairCuts')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.taxes}
                                    onChange={this.handleCheckboxChange(
                                      'taxes'
                                    )}
                                    value='taxes'
                                  />
                                }
                                label={t('filter.taxes')}
                              />
                              <FormControlLabel
                                className={classes.checkBoxField}
                                control={
                                  <Checkbox
                                    checked={this.state.faith}
                                    onChange={this.handleCheckboxChange(
                                      'faith'
                                    )}
                                    value='faith'
                                  />
                                }
                                label={t('filter.faith')}
                              />
                            </FormGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='date'
                            name='start_date'
                            label={t('event.startDate')}
                            margin='normal'
                            variant='outlined'
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='date'
                            name='end_date'
                            label={t('event.endDate')}
                            margin='normal'
                            variant='outlined'
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='time'
                            name='start_time'
                            label={t('event.startTime')}
                            margin='normal'
                            variant='outlined'
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='time'
                            name='end_time'
                            label={t('event.endTime')}
                            margin='normal'
                            variant='outlined'
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid
                          container
                          direction='row'
                          justify='flex-start'
                          alignItems='center'
                        >
                          <Grid className={classes.spacer} item>
                            <InputLabel>{t('event.recurrence')}</InputLabel>
                            <Select
                              value={this.state.repeat}
                              onChange={this.handleRecurrenceChange}
                              name='repeat'
                              displayEmpty
                              className={classes.selectEmpty}
                            >
                              <MenuItem value={'NONE'}>
                                <em>{t('recurrenceOptions.none')}</em>
                              </MenuItem>
                              <MenuItem value={'DAILY'}>
                                {t('recurrenceOptions.daily')}
                              </MenuItem>
                              <MenuItem value={'WEEKLY'}>
                                {t('recurrenceOptions.weekly')}
                              </MenuItem>
                              <MenuItem value={'BI-WEEKLY'}>
                                {t('recurrenceOptions.biWeekly')}
                              </MenuItem>
                              <MenuItem value={'MONTHLY'}>
                                {t('recurrenceOptions.monthly')}
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid
                            className={classes.spacer}
                            hidden={this.state.hideRecurrenceOptions}
                            item
                          >
                            <Field
                              component={TextField}
                              type='number'
                              name='num_occurrences'
                              className={clsx(
                                classes.margin,
                                classes.occurrenceTextField
                              )}
                              label={t('event.endAfter')}
                              defaultValue={1}
                              margin='normal'
                              variant='outlined'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                inputProps: { min: 1, max: 10 },
                                endAdornment: (
                                  <InputAdornment position='start'>
                                    {t('event.occurrences')}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      className={this.props.classes.button}
                      variant='contained'
                      color='secondary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      {t('register.btnCreate')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Event.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userDetails: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Event);
