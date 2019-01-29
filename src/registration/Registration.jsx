import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { SimpleEmailRegex } from 'Utils/regex';
import { registerOrganization, validateOrganization } from '../api/endpoints';

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
    const buttonName = validation ? 'Validate' : 'Register';
    const title = validation ? 'Validation' : 'Registration';
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
              if (!values.email) {
                errors.email = t('required', 'Required');
              } else if (!SimpleEmailRegex.test(values.email)) {
                errors.email = t('invalidEmail', 'Invalid email address');
              }

              if (!values.adminEmail) {
                errors.adminEmail = t('required', 'Required');
              } else if (!SimpleEmailRegex.test(values.adminEmail)) {
                errors.adminEmail = t('invalidEmail', 'Invalid email address');
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              if (validation) {
                const response = validateOrganization(
                  1,
                  'Org details are okay'
                );
                response
                  .then(setSubmitting(false))
                  .then(vals => console.log(vals));
              } else {
                const response = registerOrganization(values);
                console.log('response: ', response);
                console.log(JSON.stringify(response));
                response
                  .then(setSubmitting(false))
                  .then(vals => console.log(vals));
              }
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
                    <h3 className={classes.columnTitle}>Organization</h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='orgName'
                        label={t('orgName', 'Organization Name')}
                        className={classes.textField}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('orgName', 'Organization Name')}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='email'
                        label={t('email', 'Email')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('email', 'Email')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='phoneNumber'
                        label={t('phoneNumber', 'Phone Number')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('phoneNumber', 'Phone Number')}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={4} className={classes.spacer} item>
                    <h3 className={classes.columnTitle}>Address</h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='address'
                        label={t('address', 'Address')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('address', 'Address')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='city'
                        label={t('city', 'City')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('city', 'City')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='province'
                        label={t('province', 'Province')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('province', 'Province')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='postalCode'
                        label={t('postalCode', 'Postal Code')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('postalCode', 'Postal Code')}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={4} className={classes.lastColumn} item>
                    <h3 className={classes.columnTitle}>Administrator</h3>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='adminFirstName'
                        label={t('firstName', 'First Name')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('firstName', 'First Name')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='adminLastName'
                        label={t('lastName', 'Last Name')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('lastName', 'Last Name')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={validation}
                        required={true}
                        component={TextField}
                        type='text'
                        name='adminEmail'
                        label={t('email', 'Email')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('email', 'Email')}
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
