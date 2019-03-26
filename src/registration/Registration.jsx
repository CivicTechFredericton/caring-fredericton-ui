import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { SimpleEmailRegex } from 'Utils/regex';
import { registerOrganization, validateOrganization } from '../api/endpoints';
import { getSession } from '../api/cognito';
import history from '../history';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 15,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: '100%',
  },
  mainGrid: {
    width: '100%',
  },
  mainGrid2: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  spacer: {
    paddingRight: 20,
    paddingLeft: 20,
    height: '60vh',
    borderRight: '3px solid ',
    borderRightColor: theme.palette.primary.dark,
  },
  button: {
    marginTop: 10,
    color: 'white',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  columnTitle: {
    marginTop: 3,
    color: theme.palette.primary.dark,
  },
  lastColumn: {
    height: '60vh',
    paddingLeft: 20,
  },
}));

class Registration extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { t, classes, validation } = this.props;
    const buttonName = validation
      ? t('register.validate')
      : t('register.register');
    const title = validation
      ? t('register.validation')
      : t('register.registration');
    var objIni;

    if (validation) {
      objIni = {
        orgName: 'OrgTest',
        email: 'marta.padilla@gmail.com',
        phoneNumber: '5016489797',
        address: 'Alvarez Quintero',
        city: 'Malaga',
        province: 'Malaga',
        postalCode: '29720',
        adminFirstName: 'Marta',
        adminLastName: 'Padilla',
        adminEmail: 'marta.padilla@gmail.com',
      };
    } else {
      objIni = {
        orgName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
      };
    }

    return (
      <div className={classes.root}>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          <h2 className={classes.title}>{title}</h2>
          <Formik
            initialValues={objIni}
            validate={values => {
              let errors = {};

              if (!values.orgName) {
                errors.orgName = t('common.required');
              }

              if (!values.email) {
                errors.email = t('common.required');
              } else if (!SimpleEmailRegex.test(values.email)) {
                errors.email = t('error.invalidEmail');
              }

              if (!values.phoneNumber) {
                errors.phoneNumber = t('common.required');
              }

              if (!values.address) {
                errors.address = t('common.required');
              }

              if (!values.city) {
                errors.city = t('common.required');
              }

              if (!values.province) {
                errors.province = t('common.required');
              }

              if (!values.postalCode) {
                errors.postalCode = t('common.required');
              }

              if (!values.adminFirstName) {
                errors.adminFirstName = t('common.required');
              }

              if (!values.adminLastName) {
                errors.adminLastName = t('common.required');
              }

              if (!values.adminEmail) {
                errors.adminEmail = t('common.required');
              } else if (!SimpleEmailRegex.test(values.adminEmail)) {
                errors.adminEmail = t('error.invalidEmail');
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              if (validation) {
                getSession(vals => {
                  validateOrganization(
                    vals.idToken,
                    '023b8a07-8813-4b64-937b-79e6c8eb394d',
                    'Org details are okay'
                  ).then(setSubmitting(false));
                });
              } else {
                const response = registerOrganization(values);

                response.then(setSubmitting(false));
              }

              history.push('/');
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.mainGrid}>
                <Grid
                  className={classes.mainGrid2}
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Grid xs={4} className={classes.spacer} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.organization')}
                    </h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='orgName'
                        label={t('register.orgName') + '*'}
                        className={classes.textField}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.orgName') + '*'}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='email'
                        label={t('register.email') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.email') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='phoneNumber'
                        label={t('register.phoneNumber') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.phoneNumber') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={4} className={classes.spacer} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.address')}
                    </h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='address'
                        label={t('register.address') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.address') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='city'
                        label={t('register.city') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.city') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='province'
                        label={t('register.province') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.province') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='postalCode'
                        label={t('register.postalCode') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.postalCode') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={4} className={classes.lastColumn} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.administrator')}
                    </h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='adminFirstName'
                        label={t('register.firstName') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.firstName') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='adminLastName'
                        label={t('register.lastName') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.lastName') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        component={TextField}
                        type='text'
                        name='adminEmail'
                        label={t('register.email') + '*'}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.email') + '*'}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {buttonName}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    );
  }
}

Registration.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  validation: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(Registration);
