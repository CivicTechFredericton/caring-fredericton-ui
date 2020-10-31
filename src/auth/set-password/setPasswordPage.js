import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';

import Button from '../../components/common/button/button';
import TextField from '../../components/common/form/texField/textField';

import SuspenseView from '../../components/suspense-view';

import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';
import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import useStyles from './styles';

export default function SetPasswordPage({ match }) {
  const classes = useStyles();
  const { completeNewPassword, goToPage } = useAuthDataContext();
  const { t, ready } = useTranslation([
    'authentication',
    'common',
    'error',
    'form',
  ]);

  const email = match.params.confirmEmail;

  const initialValues = {
    email: email,
    password: '',
    confirmPassword: '',
  };
  const requiredTranslated = t('form:required');

  const SetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(requiredTranslated)
      .min(8, t('form:minimumLength', { value: 8 })),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('form:passwordsDoNotMatch'))
      .required(requiredTranslated),
  });

  const onSubmit = async (values, actions) => {
    const { success, errorMessage } = await completeNewPassword(
      values.password
    );
    if (success) {
      goToPage(`/signin/${email}`);
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
        validationSchema={SetPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:setPassword')}
            </div>
            <Field
              name='email'
              required
              component={TextField}
              placeholder={t('authentication:email')}
              type='email'
              disabled={true}
            />
            <Field
              name='password'
              required
              component={TextField}
              placeholder={t('authentication:password')}
              type='password'
            />
            <Field
              name='confirmPassword'
              component={TextField}
              placeholder={t('authentication:confirmPassword')}
              type='password'
            />

            {status && status.msg && (
              <Typography className={classes.error}>{status.msg}</Typography>
            )}

            <Button type='submit' disabled={!isValid || isSubmitting}>
              {t('form:submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      confirmEmail: PropTypes.string,
    }),
  }),
};
