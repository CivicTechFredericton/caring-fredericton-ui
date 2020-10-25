import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';
import SuspenseView from '../../components/suspense-view';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import useAuthDataContext from '../../auth/hooks/useAuthDataContext';

const SignInPage = ({ history, location }) => {
  const { goToPage, resendSignUp, signIn } = useAuthDataContext();
  const { t, ready } = useTranslation([
    'authentication',
    'common',
    'error',
    'form',
  ]);
  const [confirmUsername, setConfirmUsername] = useState('');

  let { from } = location.state || { from: { pathname: '/dashboard' } };
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = { email: '', password: '' };
  const SignInSchema = Yup.object().shape({
    email: Yup.string().required(t('form:required')),
    password: Yup.string().required(t('form:required')),
  });

  const onSubmit = async (values, actions) => {
    const { success, awsErrorCode, challengeName } = await signIn(
      values.email,
      values.password
    );
    if (success) {
      history.replace(from);
    } else if (challengeName === 'NEW_PASSWORD_REQUIRED') {
      // TODO: Handle 'NEW_PASSWORD_REQUIRED' scenario
    } else {
      if (awsErrorCode === 'UserNotConfirmedException') {
        setConfirmUsername(values.email);
      } else {
        actions.setStatus({ msg: t('error:invalidCredentials') });
      }
    }
  };

  const handleConfirmAccount = () => {
    resendSignUp(confirmUsername);
    goToPage(`/signup/${confirmUsername}`);
  };

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={formClasses.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:signIn')}
            </div>
            <Field
              className={classes.textField}
              type='text'
              name='email'
              label={t('authentication:email')}
              margin='normal'
              variant='outlined'
              component={FormikTextField}
              placeholder={t('authentication:email')}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Field
              className={classes.textField}
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              label={t('authentication:password')}
              margin='normal'
              variant='outlined'
              component={FormikTextField}
              placeholder={t('authentication:password')}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label={t('authentication:togglePasswordVisibility')}
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {status && status.msg && (
              <Typography className={classes.error}>{status.msg}</Typography>
            )}

            <Button
              className={classes.submitButton}
              variant='contained'
              color='secondary'
              type='submit'
              disabled={!isValid || isSubmitting}
            >
              {t('form:submit')}
            </Button>
          </Form>
        )}
      </Formik>

      <div>
        <Link to={'/forgot-password'}>
          {t('authentication:linkForgotPassword')}
        </Link>
      </div>

      <div className={classes.formLabelLinkContainer}>
        <label htmlFor='noAccount'>{t('authentication:noAccount')}</label>
        <Link to={'/signup'}>{t('authentication:signUp')}</Link>
      </div>

      <Dialog
        open={!!confirmUsername}
        onClose={handleConfirmAccount}
        aria-labelledby='confirm-account-dialog-title'
        aria-describedby='confirm-account-dialog-description'
      >
        <DialogTitle id='confirm-account-dialog-title' disableTypography={true}>
          <Typography variant='h6' color='inherit'>
            {t('authentication:dialogTitleAccountNotConfirmedYet')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-account-dialog-description'>
            {t('authentication:dialogMessageAccountNotConfirmedYet')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmAccount} color='primary' autoFocus>
            {t('common:ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignInPage;
