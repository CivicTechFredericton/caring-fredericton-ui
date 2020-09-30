import React, { useState } from 'react';
import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';
import SuspenseView from '../../components/suspense-view';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useTranslation } from 'react-i18next';
import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import useStyles from './styles';

const ResetPasswordPage = ({ props, match }) => {
  const { confirmResetPassword, goToPage } = useAuthDataContext();
  const { t, ready } = useTranslation([
    'authentication',
    'common',
    'error',
    'form',
  ]);
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const email = match.params.confirmEmail;
  const initialValues = {
    email: email,
    code: '',
    password: '',
    confirmPassword: '',
  };
  const requiredTranslated = t('form:required');

  const ConfirmResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required(requiredTranslated),
    code: Yup.string().required(requiredTranslated),
    password: Yup.string()
      .required(requiredTranslated)
      .min(8, t('form:minimumLength', { value: 8 })),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('form:passwordsDoNotMatch'))
      .required(requiredTranslated),
  });

  const onSubmit = async (values, actions) => {
    const { success, errorMessage } = await confirmResetPassword(
      values.email,
      values.code,
      values.password
    );
    if (success) {
      goToPage('/signin');
    } else {
      actions.setStatus({ msg: t(errorMessage) });
    }
  };

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={formClasses.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ConfirmResetPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:resetPassword')}
            </div>
            <Field
              component={FormikTextField}
              className={classes.textField}
              type='email'
              name='email'
              label={t('authentication:email')}
              margin='normal'
              variant='outlined'
              disabled={true}
              disableUnderline={true}
              placeholder={t('authentication:email')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Field
              component={FormikTextField}
              className={classes.textField}
              type='text'
              name='code'
              label={t('authentication:confirmationCode')}
              margin='normal'
              variant='outlined'
              placeholder={t('authentication:confirmationCode')}
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
            <Field
              className={classes.textField}
              autoComplete='current-password'
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              label={t('authentication:confirmPassword')}
              margin='normal'
              variant='outlined'
              component={FormikTextField}
              placeholder={t('authentication:confirmPassword')}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label={t('authentication:togglePasswordVisibility')}
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
    </div>
  );
};

export default ResetPasswordPage;
