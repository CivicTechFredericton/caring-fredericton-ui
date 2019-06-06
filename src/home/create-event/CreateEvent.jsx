import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';

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

import { createEvent } from '../../api/endpoints';
import { getSession } from '../../api/cognito';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
}));

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: 'md',
      repeat: 'NONE',
      categories: 'social',
    };
  }

  handleChange = event => {
    this.setState({ repeat: event.target.value });
  };

  handleCategoriesChange = event => {
    this.setState({ categories: event.target.value });
  };

  transformEvent = (event, orgId) => {
    const categories = [event.categories];

    const startDateTime = moment(
      event.start_date + ' ' + event.start_time
    ).utc();

    const endDate = event.end_date || event.start_date;

    const endDateTime = moment(endDate + ' ' + event.end_time).utc();

    const getOrgName = () => {
      if (orgId) {
        return 'Caring Calender';
      }
      return 'Caring Calender';
    };

    const isRecurring = () => {
      if (event.repeat.toUpperCase() === 'NONE') {
        return false;
      }
      return true;
    };

    const reCurringEndDate = () => {
      return endDateTime.format('YYYY-MM-DD');
    };

    const endOnDate = () => {
      return endDateTime.format('YYYY-MM-DD');
    };

    const occurrenceType = () => {
      // NEVER ON AFTER
      return 'ON';
    };

    let eventObj = {
      name: event.name,
      owner: getOrgName(),
      description: event.description,
      categories,
      start_date: startDateTime.format('YYYY-MM-DD'),
      end_date: endDateTime.format('YYYY-MM-DD'),
      start_time: startDateTime.format('HH:mm:ss'),
      end_time: endDateTime.format('HH:mm:ss'),
      end_date_no_recur: reCurringEndDate(),
      is_recurring: isRecurring(),
      recurrence_details,
      timezone: 'AST',
    };

    const recurrence_details = {
      recurrence: event.repeat.toUpperCase(),
      occurrence_type: occurrenceType(),
      num_recurrences: 10,
      on_end_date: endOnDate(),
      day_of_week: 1,
      week_of_month: 1,
      separation_count: 1,
    };

    if (event.repeat.toUpperCase() !== 'NONE') {
      eventObj.recurrence_details = recurrence_details;
    }

    return eventObj;
  };

  render() {
    const { t, classes } = this.props;

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
                {t('dialogs:createEvent')}
              </Grid>
              <IconButton
                color='inherit'
                onClick={this.props.handleClose}
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
                  categories: 'social',
                  name: '',
                  description: '',
                  start_date: '',
                  start_time: '',
                  end_time: '',
                  repeat: 'NONE',
                }}
                validate={values => {
                  let errors = {};
                  if (!values.categories) {
                    errors.categories = t('common.required');
                  }

                  if (!values.name) {
                    errors.name = t('common.required');
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  getSession(vals => {
                    const valuesTransform = this.transformEvent(
                      values,
                      '023b8a07-8813-4b64-937b-79e6c8eb394d'
                    );

                    createEvent(
                      vals.idToken,
                      '023b8a07-8813-4b64-937b-79e6c8eb394d',
                      valuesTransform
                    ).then(() => {
                      setSubmitting(false);

                      this.props.handleClose();
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
                          <InputLabel>Categories:</InputLabel>
                          <Select
                            value={this.state.categories}
                            onChange={this.handleCategoriesChange}
                            name='categories'
                            displayEmpty
                            className={classes.selectEmpty}
                          >
                            <MenuItem value='social'>
                              <em>Social</em>
                            </MenuItem>
                            <MenuItem value={'meals'}>Meals</MenuItem>
                            <MenuItem value={'laundry'}>Laundry</MenuItem>
                            <MenuItem value={'showers'}>Showers</MenuItem>
                            <MenuItem value={'education'}>Education</MenuItem>
                            <MenuItem value={'health'}>Health</MenuItem>
                            <MenuItem value={'hairCuts'}>Hair Cuts</MenuItem>
                            <MenuItem value={'taxes'}>Taxes</MenuItem>
                            <MenuItem value={'faith'}>Faith</MenuItem>
                          </Select>
                        </Grid>
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
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            multiline
                            rows='6'
                            component={TextField}
                            type='text'
                            name='description'
                            label={t('event.description')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('event.description')}
                            className={classes.textField}
                          />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='date'
                            name='start_date'
                            label={t('common.date')}
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
                        <Grid className={classes.field} item>
                          <InputLabel>Recurrence:</InputLabel>
                          <Select
                            value={this.state.repeat}
                            onChange={this.handleChange}
                            name='repeat'
                            displayEmpty
                            className={classes.selectEmpty}
                          >
                            <MenuItem value='NONE'>
                              <em>NONE</em>
                            </MenuItem>
                            <MenuItem value={'DAILY'}>Daily</MenuItem>
                            <MenuItem value={'WEEKLY'}>Weekly</MenuItem>
                            <MenuItem value={'BI-WEEKLY'}>Bi-Weekly</MenuItem>
                            <MenuItem value={'MONTHLY'}>Monthly</MenuItem>
                          </Select>
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
                      Create
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
};

export default withStyles(styles, { withTheme: true })(Event);
