import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormField from '../../components/common/formField';
import { Button, withStyles, createStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () =>
  createStyles({
    button: {
      margin: 25,
    },
  });

const Login = props => (
  <Grid container direction='column' justify='flex-start' alignItems='center'>
    <h1>Login</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
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
          <Field
            className={props.classes.field}
            type='email'
            name='email'
            label='User Name'
            component={FormField}
            placeholder='Email'
          />
          <Field
            className={props.classes.field}
            type='password'
            name='password'
            label='Password'
            component={FormField}
            placeholder='Password'
          />
          <Button
            className={props.classes.button}
            variant='contained'
            color='primary'
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </Grid>
);

Login.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Login);
