import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  createStyles,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
    field: {
      paddingBottom: 15,
    },
  });

class Registration extends React.Component {
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
          <h1>{t('register', 'Register')}</h1>
          <Formik
            initialValues={{ email: '', adminEmail: '' }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = t('required', 'Required');
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = t('invalidEmail', 'Invalid email address');
              }

              if (!values.adminEmail) {
                errors.adminEmail = t('required', 'Required');
              } else if (
                !/^[A-ZadminEmailZ0-9.-]+\.[A-Z]{2,}$/i.test(values.adminEmail)
              ) {
                errors.adminEmail = t('invalidEmail', 'Invalid email address');
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
                  <Typography>
                    {t('caringOrg', 'Please Enter Organization Details')}
                  </Typography>
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
                      name='address'
                      label={t('address', 'Address')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('address', 'Address')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='address'
                      label={t('city', 'City')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('city', 'City')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='address'
                      label={t('province', 'Province')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('province', 'Province')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='postalCode'
                      label={t('postalCode', 'Postal Code')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('postalCode', 'Postal Code')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Typography>
                    {t('caringAdmin', 'Caring Calendar Administrator')}
                  </Typography>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='adminFirstName'
                      label={t('firstName', 'First Name')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('firstName', 'First Name')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='adminLastName'
                      label={t('lastName', 'Last Name')}
                      margin='normal'
                      variant='outlined'
                      placeholder={t('lastName', 'Last Name')}
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid className={classes.field} item>
                    <Field
                      required={true}
                      component={TextField}
                      type='text'
                      name='adminEmail'
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

Registration.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(Registration);
