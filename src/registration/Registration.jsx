import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, withStyles, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { registerOrganization, validateOrganization } from '../api/endpoints';
import { getSession } from '../api/cognito';

import validation from './validation';
import styles from './styles';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intOjt: {
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
      },
      isValidationForm: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isValidationForm !== state.isValidationForm) {
      let responseData = {};

      if (props.isValidationForm) {
        responseData = {
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
        responseData = {
          adminFirstName: 'Marta',
          adminLastName: 'Padilla',
          adminEmail: 'marta.padilla@gmail.com',
        };
      }

      let intOjt = Object.assign({}, state.intOjt, responseData);
      return { intOjt, isValidationForm: props.isValidationForm };
    }
    return state;
  }

  submitValues = (values, setSubmitting) => {
    const { isValidationForm, history } = this.props;
    setSubmitting(true);

    if (isValidationForm) {
      getSession(token => {
        validateOrganization(
          token.idToken,
          '023b8a07-8813-4b64-937b-79e6c8eb394d',
          'Org details are okay'
        ).then(setSubmitting(false));
      });
    } else {
      const response = registerOrganization(values);

      response.then(setSubmitting(false));
    }

    history.push('/');
  };

  render() {
    const { t, classes, isValidationForm } = this.props;

    let buttonName = t('register.register');
    let title = t('register.registration');
    let required = '*';

    if (isValidationForm) {
      buttonName = t('register.validate');
      title = t('register.validation');
      required = '';
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
            initialValues={this.state.intOjt}
            validate={values => validation(t, values)}
            onSubmit={(values, { setSubmitting }) =>
              this.submitValues(values, setSubmitting)
            }
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
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='orgName'
                        label={t('register.orgName') + required}
                        className={classes.textField}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.orgName') + required}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='email'
                        label={t('register.email') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.email') + required}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='phoneNumber'
                        label={t('register.phoneNumber') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.phoneNumber') + required}
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
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='address'
                        label={t('register.address') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.address') + required}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='city'
                        label={t('register.city') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.city') + required}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='province'
                        label={t('register.province') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.province') + required}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='postalCode'
                        label={t('register.postalCode') + required}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.postalCode') + required}
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
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='adminFirstName'
                        label={t('register.firstName')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.firstName')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='adminLastName'
                        label={t('register.lastName')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.lastName')}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid className={classes.field} item>
                      <Field
                        disabled={isValidationForm}
                        component={TextField}
                        type='text'
                        name='adminEmail'
                        label={t('register.email')}
                        margin='normal'
                        variant='outlined'
                        placeholder={t('register.email')}
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
  isValidationForm: PropTypes.bool,
  history: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Registration);
