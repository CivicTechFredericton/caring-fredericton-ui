import React from 'react';

import { Formik, Form, Field } from 'formik';

import { TextField } from 'formik-material-ui';

import PropTypes from 'prop-types';
import {
  IconButton,
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

import { createUser } from '../../api/endpoints';
//import { getSession } from '../../api/cognito';

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
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 100,
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
    };
  }

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
              <span className={classes.flex}>Create User</span>
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
                }}
                validate={values => {
                  let errors = {};

                  if (!values.first_name) {
                    errors.first_name = t('common.required');
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  createUser(values).then(() => {
                    setSubmitting(false);

                    this.props.handleClose();
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
                            component={TextField}
                            type='text'
                            name='first_name'
                            label={t('authorize.firstName')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('authorize.firstName')}
                            className={classes.textField}
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
                          />
                        </Grid>
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
                          />
                        </Grid>
                        <Grid className={classes.field} item>
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
                        </Grid>
                        <Grid className={classes.field} item>
                          <Field
                            className={classes.textField}
                            autoComplete='current-password'
                            type='password'
                            name='confirmPassword'
                            label={t('authorize.confirmPassword') + ' *'}
                            margin='normal'
                            variant='outlined'
                            component={TextField}
                            placeholder={t('authorize.confirmPassword') + ' *'}
                            InputLabelProps={{
                              shrink: true,
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
                      Create
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
};

export default withStyles(styles, { withTheme: true })(CreateUser);
