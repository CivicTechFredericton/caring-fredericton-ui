import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { authenticateUser, getUserOrganization } from '../../api/cognito';
import { SimpleEmailRegex } from 'Utils/regex';

import logo from '../../ctflogo.jpg';
import styles from './styles';

import CreateUser from '../createUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      open: false,
    };
  }

  validation = values => {
    const { t } = this.props;
    let errors = {};

    if (!values.email) {
      errors.email = t('common.required');
    } else if (!SimpleEmailRegex.test(values.email)) {
      errors.email = errors.email = t('error.invalidEmail');
    }

    if (!values.password) {
      errors.password = t('common.required');
    }
    return errors;
  };

  openModel = () => {
    this.setState({ open: true });
  };

  closeModel = () => {
    this.setState({ open: false });
  };

  submitAuth = (values, setSubmitting) => {
    const { t, history } = this.props;
    setSubmitting(true);

    authenticateUser(values.email, values.password, response => {
      setSubmitting(false);
      if (!response) {
        this.setState({ errorMsg: '' });

        if (getUserOrganization()) {
          history.push('/registration');
        }
        history.push('/');
      } else {
        this.setState({ errorMsg: t('error.errorLogin') });
      }
    });
  };

  render() {
    const { t, classes } = this.props;

    return (
      <Grid
        className={classes.maingrid}
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => this.validation(values)}
          onSubmit={(values, { setSubmitting }) =>
            this.submitAuth(values, setSubmitting)
          }
        >
          {({ isSubmitting }) => (
            <Grid className={classes.loginDiv}>
              <Grid>
                <img className={classes.image} src={logo} />
              </Grid>
              <Form>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Typography className={classes.error}>
                    {this.state.errorMsg}
                  </Typography>

                  <Field
                    className={classes.textField}
                    type='email'
                    name='email'
                    label={t('authorize.username')}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={t('authorize.username')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Field
                    className={classes.textField}
                    autoComplete='current-password'
                    type='password'
                    name='password'
                    label={t('authorize.password') + ' *'}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={t('authorize.password') + ' *'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Button
                    className={classes.button}
                    variant='contained'
                    color='secondary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {t('authorize.login')}
                  </Button>
                </Grid>
              </Form>
            </Grid>
          )}
        </Formik>
        <Grid>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            onClick={this.openModel}
          >
            {t('authorize.register')}
          </Button>
        </Grid>
        <CreateUser
          t={t}
          show={this.state.open}
          handleClose={this.closeModel}
        />
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
