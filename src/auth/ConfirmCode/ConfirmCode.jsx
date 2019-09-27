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
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { confirmCode } from '../../api/cognito';

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
  error: {
    color: theme.palette.secondary.dark,
  },
}));

class ConfirmCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: '',
      open: false,
      fullWidth: true,
      maxWidth: 'md',
    };
  }

  submitConfirmCode = async (values, setSubmitting) => {
    const { t } = this.props;
    setSubmitting(true);

    const { error } = await confirmCode(this.props.userName, values.code);
    if (error) {
      if (error.code === 'CodeMismatchException') {
        this.setState({ errorMsg: t('error.invalidVerificationCode') });
      } else {
        this.setState({ errorMsg: t('error.defaultMessage') });
      }
    } else {
      this.setState({ errorMsg: '' });
      this.props.handleClose();
    }

    setSubmitting(false);
  };

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
                {t('authorize.lblConfirmCode')}
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
                  code: '',
                }}
                validate={values => {
                  let errors = {};

                  if (!values.code) {
                    errors.code = t('common.required');
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) =>
                  this.submitConfirmCode(values, setSubmitting)
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
                            component={TextField}
                            type='text'
                            name='code'
                            label={t('authorize.verificationCode')}
                            margin='normal'
                            variant='outlined'
                            placeholder={t('authorize.verificationCode')}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Typography className={classes.error}>
                      {this.state.errorMsg}
                    </Typography>

                    <Button
                      className={this.props.classes.button}
                      variant='contained'
                      color='secondary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      {t('authorize.btnConfirmCode')}
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

ConfirmCode.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userName: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(ConfirmCode);
