import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, createStyles, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { authenticateUser, getCurrentUser } from '../../api/cognito';
import { SimpleEmailRegex } from 'Utils/regex';

const styles = createStyles(theme => ({
  button: {
    marginTop: 25,
    color: 'white',
  },
  loginDiv: {
    border: 'solid',
    borderRadius: '20px',
    padding: '3%',
    borderColor: theme.palette.primary.main,
    width: '30%',
  },
  textField: {
    width: '100%',
  },
  title: {
    color: theme.palette.primary.dark,
  },
}));

const Login = props => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ height: '90vh' }}
    >
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
          } else if (!SimpleEmailRegex.test(values.email)) {
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
          <div className={props.classes.loginDiv}>
            <h3 className={props.classes.title}>Log in into your account</h3>
            <Form borderColor='primary'>
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
                  color='secondary'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {props.t('submit', 'Login')}
                </Button>
              </Grid>
            </Form>
          </div>
        )}
      </Formik>
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.any,
  t: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Login);
