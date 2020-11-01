import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Field, Form, Formik } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

import DialogTitle from '../common/dialog-title';
import SuspenseView from '../../suspense-view';

import useAuthDataContext from '../../../auth/hooks/useAuthDataContext';
import { useTranslation } from 'react-i18next';
import { VALUE_SELECT } from '../../common/constants';
import ProvinceList from './province-list';

import { registerOrganization } from '../../../api/organization';

export default function RegisterOrganizationDialog({ show, handleClose }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('sm');

  const { t, ready } = useTranslation(['organization', 'form']);
  const { user } = useAuthDataContext();
  const classes = useStyles();

  const initialValues = {
    isCancelButton: false,
    administratorId: user.id,
    orgName: '',
    orgEmail: '',
    phoneNumber: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
  };

  const requiredTranslated = t('form:required');
  const RegisterOrganizationSchema = Yup.object().shape({
    orgName: Yup.string().required(requiredTranslated),
    orgEmail: Yup.string()
      .email(t('form:invalidEmail'))
      .required(requiredTranslated),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, t('form:invalidPhoneNumber'))
      .min(10, t('form:exactLength', { value: 10 }))
      .max(10, t('form:exactLength', { value: 10 }))
      .required(requiredTranslated),
    street: Yup.string().required(requiredTranslated),
    city: Yup.string().required(requiredTranslated),
    province: Yup.string()
      .notOneOf([VALUE_SELECT], requiredTranslated)
      .required(requiredTranslated),
    postalCode: Yup.string()
      .min(6, t('form:exactLength', { value: 6 }))
      .max(6, t('form:exactLength', { value: 6 }))
      .required(requiredTranslated),
  });

  /**
   * Methods for handling the confirmation dialog
   */
  const openConfirmModel = () => {
    setOpenCancel(true);
  };

  const closeConfirmModel = () => {
    setOpenCancel(false);
  };

  const onSubmit = async (values, actions) => {
    if (values && !values.isCancelButton) {
      const result = await registerOrganization(values);
      if (result.success) {
        handleClose();
      } else {
        let errorMessage;
        if (result.statusCode === 409) {
          errorMessage = t('organization:errorOrgAlreadyInUse', {
            orgName: values.orgName,
          });
        } else {
          errorMessage = t(result.errorMessage);
        }

        actions.setStatus({ msg: errorMessage });
      }
    } else {
      closeConfirmModel();
      handleClose();
    }
  };

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={classes.root}>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={show}
        aria-labelledby='register-org-dialog-title'
      >
        <DialogTitle id='register-org-dialog-title'>
          {t('organization:lblRegisterOrganization')}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterOrganizationSchema}
            onSubmit={onSubmit}
          >
            {({ values, status, isSubmitting, isValid, dirty }) => (
              <Form>
                <Typography gutterBottom>
                  {t('organization:lblCompleteRequired')}
                </Typography>
                <Field
                  className={classes.textField}
                  type='text'
                  name='orgName'
                  label={t('organization:lblOrganizationName')}
                  margin='normal'
                  variant='outlined'
                  component={FormikTextField}
                  placeholder={t('organization:lblOrganizationName')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item xs={12} sm={7}>
                    <Field
                      className={classes.textField}
                      type='email'
                      name='orgEmail'
                      label={t('organization:lblContactEmail')}
                      margin='normal'
                      variant='outlined'
                      component={FormikTextField}
                      placeholder={t('organization:lblContactEmail')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Field
                      className={classes.textField}
                      type='text'
                      name='phoneNumber'
                      label={t('organization:lblPhoneNumber')}
                      margin='normal'
                      variant='outlined'
                      component={FormikTextField}
                      placeholder={t('organization:lblPhoneNumber')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Field
                  className={classes.textField}
                  type='text'
                  name='street'
                  label={t('organization:lblStreet')}
                  margin='normal'
                  variant='outlined'
                  component={FormikTextField}
                  placeholder={t('organization:lblStreet')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item xs={12} sm={4}>
                    <Field
                      className={classes.textField}
                      type='text'
                      name='city'
                      variant='outlined'
                      label={t('organization:lblCity')}
                      margin='normal'
                      component={FormikTextField}
                      placeholder={t('organization:lblCity')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Field
                      select
                      component={FormikTextField}
                      name='province'
                      variant='outlined'
                      label={t('organization:lblProvince')}
                      className={classes.textField}
                      placeholder={t('organization:lblProvince')}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin='normal'
                    >
                      <ProvinceList />
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      className={classes.textField}
                      type='text'
                      variant='outlined'
                      name='postalCode'
                      label={t('organization:lblPostalCode')}
                      margin='normal'
                      component={FormikTextField}
                      placeholder={t('organization:lblPostalCode')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                {status && status.msg && (
                  <Typography className={classes.error}>
                    {status.msg}
                  </Typography>
                )}
                <Divider />
                <Grid container justify='flex-end'>
                  <Grid item>
                    <Button type='submit' disabled={!isValid || isSubmitting}>
                      {t('organization:btnRegister')}
                    </Button>
                    <Button
                      variant='text'
                      color='inherit'
                      onClick={openConfirmModel}
                      aria-label='Cancel'
                    >
                      {t('form:cancel')}
                    </Button>
                    <Dialog
                      open={openCancel}
                      onClose={closeConfirmModel}
                      aria-labelledby='form-dialog-title'
                    >
                      <DialogContent>{t('form:discardChanges')}</DialogContent>
                      <DialogActions>
                        <Button
                          type='submit'
                          onClick={async () => {
                            values = {
                              isCancelButton: true,
                              isDirty: dirty,
                            };
                            onSubmit(values, {});
                          }}
                        >
                          {t('common:yes')}
                        </Button>
                        <Button onClick={closeConfirmModel} autoFocus>
                          {t('common:no')}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

RegisterOrganizationDialog.propTypes = {
  show: PropTypes.boolean,
  handleClose: PropTypes.func,
};
