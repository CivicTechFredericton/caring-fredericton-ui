import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, createStyles, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { authenticateUser, getCurrentUser } from '../../api/cognito';
import { SimpleEmailRegex } from 'Utils/regex';

const styles = () =>
  createStyles({
    button: {
      margin: 25,
    },
  });

const ChangePassword = props => {
  return (
    <Grid container direction='column' justify='flex-start' alignItems='center'>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          password1: '',
          password2: '',
        }}
        validate={values => {
          console.log(values);
          let errors = {};
          if (!values.email) {
            errors.email = props.t('required', 'Required');
          } else if (!SimpleEmailRegex.test(values.email)) {
            errors.email = errors.email = props.t(
              'invalidEmail',
              'Invalid email address'
            );
          }

          if (!values.password) {
            errors.password = props.t('required', 'Required');
          }

          if (values.password1 !== values.password2) {
            errors.password1 = errors.password = props.t(
              'Passwords do not match'
            );
          }
          if (values.password2 !== values.password1) {
            errors.password2 = errors.password = props.t(
              'Passwords do not match'
            );
          }

          console.log('errors:', errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          authenticateUser(values.email, values.password, cbVals =>
            console.log(cbVals)
          );
          setTimeout(() => {
            setSubmitting(false);
            const user = getCurrentUser(vals =>
              console.log('callback to getCurrentUser:', vals)
            );
            console.log('user:', user);
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
              <Field
                required
                className={props.classes.textField}
                type='email'
                name='email'
                label={props.t('userName', 'User Name')}
                margin='normal'
                variant='outlined'
                component={TextField}
                placeholder={props.t('userName', 'User Name')}
              />
              <Field
                className={props.classes.textField}
                //autoComplete='current-password'
                type='password'
                name='password'
                label={props.t('password', 'Current Password') + ' *'}
                margin='normal'
                variant='outlined'
                component={TextField}
                placeholder={props.t('password', 'Current Password') + ' *'}
              />

              <Field
                className={props.classes.textField}
                //autoComplete='current-password'
                type='password'
                name='password1'
                label={props.t('password1', 'New Password') + ' *'}
                margin='normal'
                variant='outlined'
                component={TextField}
                placeholder={props.t('password1', 'New Password') + ' *'}
              />

              <Field
                className={props.classes.textField}
                //autoComplete='current-password'
                type='password'
                name='password2'
                label={props.t('password2', 'New Password') + ' *'}
                margin='normal'
                variant='outlined'
                component={TextField}
                placeholder={
                  props.t('password2', 'Re-Enter New Password') + ' *'
                }
              />
              <Button
                className={props.classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                {props.t('common.submit')}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

ChangePassword.propTypes = {
  classes: PropTypes.any,
  t: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(ChangePassword);
