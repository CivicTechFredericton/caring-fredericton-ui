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
    const { t, classes, history } = this.props;
    return (
      <Grid
        className={classes.maingrid}
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
              errors.email = t('common.required');
            } else if (!SimpleEmailRegex.test(values.email)) {
              errors.email = errors.email = t('error.invalidEmail');
            }

            if (!values.password) {
              errors.password = t('common.required');
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.setState({ errorMsg: '' });
            setSubmitting(true);
            authenticateUser(values.email, values.password, cbVals => {
              setSubmitting(false);
              if (!cbVals) {
                history.push('/registration');
              } else {
                this.setState({ errorMsg: t('authorize.errorLogin') });
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <div className={classes.loginDiv}>
              <div>
                <img className={classes.image} src={logo} />
              </div>
              <Form>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='center'
                >
                  <span className={classes.error}>{this.state.errorMsg}</span>
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
