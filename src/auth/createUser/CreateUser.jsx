import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  Button,
  Typography,
} from '@material-ui/core';

import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { signUp } from '../../api/cognito';
import { RegisterButton } from '../../components/RegisterButton';
import styles from './styles';

class CreateUser extends React.Component {
  defaultState = {
    errorMsg: '',
    open: false,
    showPassword: false,
    showConfirmPassword: false,
  };

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  handleDialogClose = () => {
    this.setState(this.defaultState);
    this.props.handleClose();
  };

  handleClickShowPassword = () => {
    let currFlag = this.state.showPassword;
    this.setState({ showPassword: !currFlag });
  };

  handleClickShowConfirmPassword = () => {
    let currFlag = this.state.showConfirmPassword;
    this.setState({ showConfirmPassword: !currFlag });
  };

  submitCreateUser = async (values, setSubmitting) => {
    const { t } = this.props;
    setSubmitting(true);

    const { error } = await signUp(values);
    if (error) {
      if (error.code === 'UsernameExistsException') {
        this.setState({
          errorMsg: t('error.userAlreadyExists', { address: values.email }),
        });
      } else if (error.code === 'InvalidPasswordException') {
        // TODO: Place this check in a common function that can be used by forgot password
        // and set password
        let message = error.message;
        if (message.includes('long enough')) {
          this.setState({ errorMsg: t('error.passwordTooShort') });
        } else if (message.includes('numeric')) {
          this.setState({ errorMsg: t('error.passwordMissingNumber') });
        } else if (message.includes('lowercase')) {
          this.setState({ errorMsg: t('error.passwordMissingLowercase') });
        } else if (message.includes('uppercase')) {
          this.setState({ errorMsg: t('error.passwordMissingUppercase') });
        } else if (message.includes('symbol')) {
          this.setState({ errorMsg: t('error.passwordMissingSymbol') });
        } else {
          this.setState({ errorMsg: t('error.defaultMessage') });
        }
      } else if (error.code === 'InvalidParameterException') {
        if (
          error.message.includes(
            'member must have length greater than or equal to 6'
          )
        ) {
          this.setState({ errorMsg: t('error.passwordTooShort') });
        } else {
          this.setState({ errorMsg: t('error.defaultMessage') });
        }
      } else {
        console.log(error);
      }
    } else {
      this.setState({ errorMsg: '' });
      this.props.setUsername(values.email);
      this.props.handleClose();
      this.props.toggleConfirm();
    }

    setSubmitting(false);
  };

  render() {
    const { t, classes } = this.props;

    const requiredTranslated = t('common:required');

    const SignUpSchema = Yup.object().shape({
      email: Yup.string()
        .email(t('error:invalidEmail'))
        .required(requiredTranslated),
      first_name: Yup.string().required(requiredTranslated),
      last_name: Yup.string().required(requiredTranslated),
      password: Yup.string().required(requiredTranslated),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('error:passwordsDoNotMatch'))
        .required(requiredTranslated),
    });

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.show}
          aria-labelledby='form-dialog-title'
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Grid item className={classes.flex}>
                {t('dialogs.registerUser')}
              </Grid>
              <Tooltip title={t('common.btnClose')}>
                <IconButton
                  color='inherit'
                  onClick={this.props.handleClose}
                  aria-label='Close'
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='center'
            >
              <Formik
                initialValues={{
                  email: '',
                  first_name: '',
                  last_name: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) =>
                  this.submitCreateUser(values, setSubmitting)
                }
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid
                      container
                      direction='row'
                      justify='flex-start'
                      alignItems='center'
                    >
                      <Grid className={classes.spacer} item>
                        <Grid className={classes.field} item>
                          <Field
                            className={classes.textField}
                            type='email'
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
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='text'
                            name='first_name'
                            label={t('authorize.firstName')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('authorize.firstName')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            component={TextField}
                            type='text'
                            name='last_name'
                            label={t('authorize.lastName')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('authorize.lastName')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid className={classes.field} item>
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
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            className={classes.textField}
                            autoComplete='current-password'
                            type={
                              this.state.showConfirmPassword
                                ? 'text'
                                : 'password'
                            }
                            name='confirmPassword'
                            label={t('authorize.confirmPassword')}
                            margin='normal'
                            variant='outlined'
                            component={TextField}
                            placeholder={t('authorize.confirmPassword')}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton
                                    edge='end'
                                    aria-label='Toggle password visibility'
                                    onClick={
                                      this.handleClickShowConfirmPassword
                                    }
                                  >
                                    {this.state.showConfirmPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Typography className={classes.error}>
                      {this.state.errorMsg}
                    </Typography>

                    <Grid container direction='row' justify='center'>
                      <Grid item>
                        <RegisterButton onClick={this.props.handleClose}>
                          {t('common.cancel')}
                        </RegisterButton>
                      </Grid>
                      <Grid item>
                        <Button
                          className={this.props.classes.button}
                          variant='contained'
                          color='secondary'
                          type='submit'
                          disabled={isSubmitting}
                        >
                          {t('authorize.btnCreate')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CreateUser.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  toggleConfirm: PropTypes.func,
  setUsername: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(CreateUser);
