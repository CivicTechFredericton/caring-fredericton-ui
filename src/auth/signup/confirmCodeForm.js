import React, { useState } from 'react';
import PropTypes from 'prop-types';

import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';

import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import useStyles from './styles';

export default function ConfirmCodeForm({ email, t }) {
  const { confirmSignUp, goToPage, resendSignUp } = useAuthDataContext();
  const classes = useStyles();

  const initialValues = { code: '' };

  const requiredTranslated = t('form:required');
  const ConfirmCodeSchema = Yup.object().shape({
    code: Yup.string().required(requiredTranslated),
  });

  const onSubmit = async (values, actions) => {
    const { success, errorMessage } = await confirmSignUp(email, values.code);
    if (success) {
      goToPage('/signin');
    } else {
      actions.setStatus({ msg: t(errorMessage) });
    }
  };

  const [isResendingCode, setIsResendingCode] = useState(false);

  const resendCode = async () => {
    setIsResendingCode(true);
    await resendSignUp(email);
    setIsResendingCode(false);
  };

  return (
    <div className={formClasses.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ConfirmCodeSchema}
        onSubmit={onSubmit}
      >
        {({ status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:confirmCode')}
            </div>
            <Typography gutterBottom>
              {t('authentication:lblConfirmCodeSentInfo', {
                email: email,
              })}
            </Typography>
            <Typography gutterBottom>
              {t('authentication:lblConfirmCodeDetails')}
            </Typography>
            <div>
              <Field
                component={FormikTextField}
                className={classes.codeTextField}
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
            </div>

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
        <label htmlFor='resendCode'>{t('authentication:lblResendCode')}</label>
        <Link onClick={resendCode} disabled={isResendingCode}>
          {t('authentication:btnResendCode')}
        </Link>
      </div>
    </div>
  );
}

ConfirmCodeForm.propTypes = {
  t: PropTypes.object.required,
  email: PropTypes.string.required,
};
