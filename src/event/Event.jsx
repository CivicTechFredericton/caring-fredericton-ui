import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  createStyles,
  TextField,
  Button,
} from '@material-ui/core';
import { SimpleEmailRegex } from '/src/utils/regex';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
    field: {
      paddingBottom: 15,
    },
  });

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
          <h1>{t('addevent', 'Add Event')}</h1>
          <Formik
            initialValues={{ email: '', adminEmail: '' }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = t('required', 'Required');
              } else if (!SimpleEmailRegex.test(values.email)) {
                errors.email = t('invalidEmail', 'Invalid email address');
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
                  direction='column'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='date'
                      name='startDate'
                      label={t('startDate', 'Start Date')}
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
                      name='endDate'
                      label={t('endDate', 'End Date')}
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
                      required={true}
                      component={TextField}
                      type='text'
                      name='fullName'
                      label={t('fullName', 'Full Name')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('fullName', 'Full Name')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='phoneNumber'
                      label={t('phoneNumber', 'Phone Number')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('phoneNumber', 'Phone Number')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='nonProfit'
                      label={t('nonProfit', 'Non Profit')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('nonProfit', 'Non Profit')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='orgName'
                      label={t('orgName', 'Organization Name')}
                      className={classes.textField}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('orgName', 'Organization Name')}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='email'
                      label={t('email', 'Email')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('email', 'Email')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {t('submit', 'Submit')}
                  </Button>
                </Grid>
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

export default withStyles(styles)(Event);
