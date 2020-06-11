import React, { useState } from 'react';
import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import useStyles from './styles';

const SignUpForm = ({ t }) => {
  const { goToPage, signUp } = useAuthDataContext();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const requiredTranslated = t('form:required');

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required(requiredTranslated),
    lastName: Yup.string().required(requiredTranslated),
    email: Yup.string()
      .email(t('form:invalidEmail'))
      .required(requiredTranslated),
    password: Yup.string()
      .required(requiredTranslated)
      .min(8, t('form:minimumLength', { value: 8 })),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('form:passwordsDoNotMatch'))
      .required(requiredTranslated),
  });

  const onSubmit = async (values, actions) => {
    const result = await signUp(values);
    if (result.success) {
      goToPage(`/signup/${values.email}`);
    } else {
      let errorMessage;
      if (result.awsErrorCode === 'UsernameExistsException') {
        errorMessage = t('authentication:errorEmailAlreadyInUse', {
          email: values.email,
        });
      } else {
        errorMessage = t(result.errorMessage);
      }

      actions.setStatus({ msg: errorMessage });
    }
  };

  return (
    <div className={formClasses.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:signUp')}
            </div>
            <Field
              component={FormikTextField}
              className={classes.textField}
              type='text'
              name='firstName'
              label={t('authentication:firstName')}
              margin='normal'
              variant='outlined'
              placeholder={t('authentication:firstName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Field
              component={FormikTextField}
              className={classes.textField}
              type='text'
              name='lastName'
              label={t('authentication:lastName')}
              margin='normal'
              variant='outlined'
              placeholder={t('authentication:lastName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Field
              component={FormikTextField}
              className={classes.textField}
              type='email'
              name='email'
              label={t('authentication:email')}
              margin='normal'
              variant='outlined'
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
            <Field
              className={classes.textField}
              autoComplete='current-password'
              type={showPassword ? 'text' : 'password'}
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

export default SignUpForm;
