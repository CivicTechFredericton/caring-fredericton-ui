import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import FormField from '../../components/common/formField';
import { Button, withStyles, createStyles, Grid, TextField } from '@material-ui/core';
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
        } else {
          errors.email = '';
        }
        
        if (!values.password) {
          errors.password = 'Required';
        } else {
          errors.password = '';
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
          direction="column"
          justify="flex-start"
          alignItems="center"
          >
          <Field className={props.classes.textField}
                 type="email" 
                 name="email" 
                 label="User Name"
                 margin="normal"
                 variant="outlined"
                 component={TextField} 
                 placeholder="Email" />
          <ErrorMessage name="email" />      
          <Field className={props.classes.textField}
                autoComplete="current-password"
                 type="password" 
                 name="password" 
                 label= "Password"
                 margin="normal"
                 variant="outlined"
                 component={TextField} 
                 placeholder="Password"/>
           <ErrorMessage name="password" />
          <Button className={props.classes.button} 
                  variant="contained" 
                  color="primary" 
                  type="submit" 
                  disabled={isSubmitting}>
            Submit
          </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  </Grid>
);

Login.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Login);
