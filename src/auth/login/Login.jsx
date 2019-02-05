import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, createStyles, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { authenticateUser } from '../../api/cognito';
import { SimpleEmailRegex } from 'Utils/regex';

import logo from '../../ctflogo.jpg';

const styles = createStyles(theme => ({
  button: {
    marginTop: 25,
    color: 'white',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingRight: '30px',
    paddingLeft: '30px',
    fontSize: '18px',
  },
  loginDiv: {
    /*  border: 'solid',
    borderRadius: '20px',
    borderWidth: '7px',
    padding: '2%',
    borderColor: theme.palette.primary.main,*/
    width: '35%',
  },
  textField: {
    width: '100%',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  maingrid: {
    height: '90vh',
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: '',
    };
  }
  render() {
    return (
      <Grid
        className={this.props.classes.maingrid}
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = this.props.t('required', 'Required');
            } else if (!SimpleEmailRegex.test(values.email)) {
              errors.email = errors.email = this.props.t(
                'invalidEmail',
                'Invalid email address'
              );
            }

            if (!values.password) {
              errors.password = this.props.t('required', 'Required');
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.setState({ errorMsg: '' });
            setSubmitting(true);
            authenticateUser(values.email, values.password, cbVals => {
              setSubmitting(false);
              if (!cbVals) {
                this.props.history.push('/validation');
              } else {
                this.setState({ errorMsg: 'Wrong username or password' });
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <div className={this.props.classes.loginDiv}>
              <div>
                <img className={this.props.classes.image} src={logo} />
              </div>
              <Form>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='center'
                >
                  <span className={this.props.classes.error}>
                    {this.state.errorMsg}
                  </span>
                  <Field
                    required
                    className={this.props.classes.textField}
                    type='email'
                    name='email'
                    label={this.props.t('userName', 'User Name')}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={this.props.t('userName', 'User Name')}
                  />
                  <Field
                    className={this.props.classes.textField}
                    autoComplete='current-password'
                    type='password'
                    name='password'
                    label={this.props.t('password', 'Password') + ' *'}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={this.props.t('password', 'Password') + ' *'}
                  />

                  <Button
                    className={this.props.classes.button}
                    variant='contained'
                    color='secondary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {this.props.t('submit', 'Login')}
                  </Button>
                </Grid>
              </Form>
            </div>
          )}
        </Formik>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.any,
  t: PropTypes.any,
  history: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Login);
