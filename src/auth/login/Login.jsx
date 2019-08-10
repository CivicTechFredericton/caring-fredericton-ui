import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, withStyles, Grid, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import CreateUser from '../createUser';
import ConfirmCode from '../ConfirmCode';
import { signIn, resendCode } from '../../api/cognito';

import logo from '../../ctflogo.jpg';
import styles from './styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  handleClickShowPassword = () => {
    let currFlag = this.state.showPassword;
    this.setState({ showPassword: !currFlag });
  };

  openCreateUserModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  openConfirmModal = () => {
    this.setState({ confirmCode: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmCode: false, userName: '' });
  };

  setUserName = userName => {
    this.setState({ userName });
  };

  handleConfirmAccount = email => {
    console.log('In login');
    // Resend the confirmation code
    resendCode(email);

    // Show the confirm code screen
    this.setUserName(email);
    this.openConfirmModal();
  };

  submitAuth = async (values, setSubmitting) => {
    const { t, history, match } = this.props;
    setSubmitting(true);

    const { challenge, error, user } = await signIn(
      values.email,
      values.password
    );

    if (challenge && challenge.name === 'NEW_PASSWORD_REQUIRED') {
      // User needs to set their new password
      console.log(user);
    } else if (error) {
      console.log(error);
      if (error.code === 'UserNotConfirmedException') {
        this.handleConfirmAccount(values.email);
      } else {
        this.setState({ errorMsg: t('error.invalidCredentials') });
      }
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

    const SignInSchema = Yup.object().shape({
      email: Yup.string()
        .email(t('common:invalidEmail'))
        .required(t('common.required')),
      password: Yup.string().required(t('common.required')),
    });

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
          validationSchema={SignInSchema}
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
                    name='email'
                    label={t('authorize.userEmail')}
                    margin='normal'
                    variant='outlined'
                    component={TextField}
                    placeholder={t('authorize.userEmail')}
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

                  <div className={classes.formLabelLinkContainer}>
                    <Typography
                      className={classes.formLabelMarginRight}
                      variant='body1'
                      color='textSecondary'
                    >
                      {t('authorize.noAccount')}
                    </Typography>
                    <Link
                      component='button'
                      variant='button'
                      color='textPrimary'
                      underline='always'
                      onClick={this.openCreateUserModal}
                    >
                      {t('authorize.signUp')}
                    </Link>
                  </div>

                  <Dialog
                    open={!!this.state.userName}
                    onClose={this.handleConfirmAccount}
                    aria-labelledby='confirm-account-dialog-title'
                    aria-describedby='confirm-account-dialog-description'
                  >
                    <DialogTitle
                      id='confirm-account-dialog-title'
                      disableTypography={true}
                    >
                      <Typography variant='h6' color='inherit'>
                        {t('authorize.dialogTitleAccountNotConfirmedYet')}
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='confirm-account-dialog-description'>
                        {t('authorize.dialogMessageAccountNotConfirmedYet')}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleConfirmAccount}
                        color='primary'
                        autoFocus
                      >
                        {t('common.btnOk')}
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Grid item>
                    <CreateUser
                      t={t}
                      show={this.state.open}
                      handleClose={this.closeModal}
                      toggleConfirm={this.openConfirmModal}
                      setUsername={this.setUserName}
                    />
                    <ConfirmCode
                      t={t}
                      show={this.state.confirmCode}
                      handleClose={this.closeConfirmModal}
                      userName={this.state.userName}
                    />
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
