import React from 'react';

import { Formik, Form, Field } from 'formik';

import { TextField } from 'formik-material-ui';

import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  createStyles,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { createUser } from '../../api/endpoints';
import { SimpleEmailRegex } from '../../utils/regex';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: 350,
  },
  spacer: {
    paddingRight: 20,
  },
  button: {
    marginLeft: '40%',
    marginTop: 30,
    color: 'white',
    fontSize: '14px',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}));

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: 'md',
      showPassword: false,
      showConfirmPassword: false,
    };
  }

  handleClickShowPassword = () => {
    let currFlag = this.state.showPassword;
    this.setState({ showPassword: !currFlag });
  };

  handleClickShowConfirmPassword = () => {
    let currFlag = this.state.showConfirmPassword;
    this.setState({ showConfirmPassword: !currFlag });
  };

  // TODO: Capture errors from the API calls
  /*submitCreateUser = (values, setSubmitting) => {
    const { t, history } = this.props;
    setSubmitting(true);

    createUser(values).then(() => {
      setSubmitting(false);
      this.props.setUsername(values.email);
      this.props.handleClose();
      this.props.toggleConfirm();
    });
  };*/

  render() {
    const { t, classes } = this.props;

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
                {t('dialogs.createUser')}
              </Grid>
              <IconButton
                color='inherit'
                onClick={this.props.handleClose}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
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
                validate={values => {
                  let errors = {};

                  if (!values.email) {
                    errors.email = t('common.required');
                  } else if (!SimpleEmailRegex.test(values.email)) {
                    errors.email = t('error.invalidEmail');
                  }

                  if (!values.first_name) {
                    errors.first_name = t('common.required');
                  }

                  if (!values.last_name) {
                    errors.last_name = t('common.required');
                  }

                  if (!values.password) {
                    errors.password = t('common.required');
                  }

                  if (!values.confirmPassword) {
                    errors.confirmPassword = t('common.required');
                  }

                  if (values.password !== values.confirmPassword) {
                    errors.password = errors.confirmPassword = t(
                      'error.passwordsDoNotMatch'
                    );
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  createUser(values).then(() => {
                    setSubmitting(false);
                    this.props.setUsername(values.email);
                    this.props.handleClose();
                    this.props.toggleConfirm();
                  });
                }}
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
                    <Button
                      className={this.props.classes.button}
                      variant='contained'
                      color='secondary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      {t('authorize.btnCreate')}
                    </Button>
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
