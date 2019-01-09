import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, createStyles, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { authenticateUser, getCurrentUser } from '../../api/cognito';

const styles = () =>
  createStyles({
    button: {
      margin: 25,
    },
  });

const Login = props => {
  return (
    <Grid container direction='column' justify='flex-start' alignItems='center'>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={values => {
          console.log(values);
          let errors = {};
          if (!values.email) {
            errors.email = props.t('required', 'Required');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = errors.email = props.t(
              'invalidEmail',
              'Invalid email address'
            );
          }

          if (!values.password) {
            errors.password = props.t('required', 'Required');
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
                autoComplete='current-password'
                type='password'
                name='password'
                label={props.t('password', 'Password') + ' *'}
                margin='normal'
                variant='outlined'
                component={TextField}
                placeholder={props.t('password', 'Password') + ' *'}
              />
              <Button
                className={props.classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                {props.t('submit', 'Submit')}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.any,
  t: PropTypes.any,
};

export default withStyles(styles)(Login);
