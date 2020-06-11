import React from 'react';
import formClasses from '../../components/common/form/form.module.scss';
import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import useStyles from './styles';

const ForgotPasswordForm = ({ t }) => {
  const { goToPage, resetPassword } = useAuthDataContext();
  const classes = useStyles();

  const initialValues = { email: '' };

  const requiredTranslated = t('form:required');
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('form:invalidEmail'))
      .required(requiredTranslated),
  });

  const onSubmit = async (values, actions) => {
    const { success, errorMessage } = await resetPassword(values.email);
    if (success) {
      goToPage('/forgot-password/?success=true');
    } else {
      actions.setStatus({ msg: t(errorMessage) });
    }
  };

  return (
    <div className={formClasses.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, isSubmitting, isValid }) => (
          <Form
            className={classNames(formClasses.paper, formClasses.paperSmall)}
          >
            <div className={formClasses.title}>
              {t('authentication:lblForgotPassword')}
            </div>
            <Typography gutterBottom className={classes.typography}>
              {t('authentication:lblForgotPasswordDetails')}
            </Typography>
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

export default ForgotPasswordForm;
