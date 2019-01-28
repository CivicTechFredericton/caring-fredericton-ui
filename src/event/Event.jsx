import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

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
    marginTop: 30,
  },
  title: {
    color: theme.palette.primary.dark,
  },
}));

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          <h2 className={classes.title}>{t('addEvent', 'Event')}</h2>
          <Formik
            initialValues={{ categories: '', eventName: '' }}
            validate={values => {
              let errors = {};
              if (!values.categories) {
                errors.categories = t('required', 'Required');
              }

              if (!values.name) {
                errors.name = t('required', 'Required');
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
                        name='categories'
                        label={t('eventCategory', 'Event Category')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('eventCategory', 'Event Category')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        component={TextField}
                        type='text'
                        name='name'
                        label={t('eventName', 'Event Name')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('eventName', 'Event Name')}
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
                        label={t('eventDescription', 'Event Description')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('eventDescription', 'Event Description')}
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
                        label={t('date', 'Date')}
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
                        label={t('startTime', 'Start Time')}
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
                        label={t('endTime', 'End Time')}
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
                        type='text'
                        name='repeat'
                        label={t('repeat', 'Repeat')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('repeat', 'Repeat')}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {t('submit', 'Add')}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    );
  }
}

Event.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Event);
