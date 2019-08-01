import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, Grid, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import { signIn } from '../../api/cognito';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import logo from '../../ctflogo.jpg';
import styles from './styles';

import CreateUser from '../createUser';
import ConfirmCode from '../ConfirmCode';

const RegisterButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
  },
})(Button);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: '',
      open: false,
      confirmCode: false,
      userName: '',
      showPassword: false,
    };
  }

  validation = values => {
    const { t } = this.props;
    let errors = {};

    if (!values.username) {
      errors.username = t('common.required');
    }

    if (!values.password) {
      errors.password = t('common.required');
    }
    return errors;
  };

  handleClickShowPassword = () => {
    let currFlag = this.state.showPassword;
    this.setState({ showPassword: !currFlag });
  };

  openModel = () => {
    this.setState({ open: true });
  };

  closeModel = () => {
    this.setState({ open: false });
  };

  openConfirmModel = () => {
    this.setState({ confirmCode: true });
  };

  closeConfirmModel = () => {
    this.setState({ confirmCode: false, userName: '' });
  };

  setUserName = userName => {
    this.setState({ userName });
  };

  submitAuth = async (values, setSubmitting) => {
    const { t, history, match } = this.props;
    setSubmitting(true);

    const { challenge, error, user } = await signIn(
      values.username,
      values.password
    );
    if (challenge && challenge.name === 'NEW_PASSWORD_REQUIRED') {
      // User needs to set their new password
      console.log(user);
    }
    if (error) {
      this.setState({ errorMsg: t('error.errorLogin') });
    } else {
      this.setState({ errorMsg: '' });

      let orgId = match.params.orgId;
      if (orgId) {
        history.push('/validation/' + orgId);
      } else {
        history.push('/');
      }
    }

    setSubmitting(false);
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
          initialValues={{ username: '', password: '' }}
          validate={values => this.validation(values)}
          onSubmit={(values, { setSubmitting }) =>
            this.submitAuth(values, setSubmitting)
          }
        >
          {({ isSubmitting }) => (
            <Grid className={classes.loginDiv}>
              <Grid>
                <img
                  className={classes.image}
                  src={logo}
                  alt={t('authorize:login_icon')}
                />
              </Grid>
              <Form>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Field
                    className={classes.textField}
                    type='text'
                    name='username'
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
                    type={this.state.showPassword ? 'text' : 'password'}
                    name='password'
                    label={t('authorize.password')}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={t('authorize.password')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='Toggle password visibility'
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Typography className={classes.error}>
                    {this.state.errorMsg}
                  </Typography>

                  <Button
                    className={classes.loginButton}
                    variant='contained'
                    color='secondary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {t('authorize.login')}
                  </Button>

                  <Grid item>
                    <CreateUser
                      t={t}
                      show={this.state.open}
                      handleClose={this.closeModel}
                      toggleConfirm={this.openConfirmModel}
                      setUsername={this.setUserName}
                    />
                    <ConfirmCode
                      t={t}
                      show={this.state.confirmCode}
                      handleClose={this.closeConfirmModel}
                      userName={this.state.userName}
                    />
                    <RegisterButton
                      className={classes.button}
                      onClick={this.openModel}
                    >
                      {t('authorize.registerUser')}
                    </RegisterButton>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
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
  match: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Login);
