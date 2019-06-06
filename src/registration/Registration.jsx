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
      intOjt: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Initialize validation or registration page through api calls
    if (!state.intOjt) {
      let intOjt = {
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

      intOjt = Object.assign({}, intOjt, responseData);
      return { intOjt };
    }
    return state;
  }

  //Formik submission and api calls
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
      const response = registerOrganization(token.idToken, values);

      response.then(setSubmitting(false));
    }

    history.push('/');
  };

  //create generic reusable input field
  getInputFields = configData => {
    const { classes } = this.props;

    return configData.map(value => (
      <Grid key={value.name} className={classes.field} item>
        <Field
          disabled={value.disabled}
          component={value.component}
          type={value.text}
          name={value.name}
          label={value.label}
          className={value.className}
          margin={value.margin}
          variant={value.variant}
          placeholder={value.placeholder}
        />
      </Grid>
    ));
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

    /////Configure fields section

    //Default field properties
    const defaultField = {
      disabled: isValidationForm,
      component: TextField,
      type: 'text',
      name: '',
      label: '',
      className: classes.textField,
      margin: 'normal',
      variant: 'outlined',
      placeholder: '',
    };

    // Column 1 config of fields
    const creatConfigColumn1 = () => {
      const configColumn1 = [];
      const element1 = {
        name: 'orgName',
        label: t('register.orgName') + required,
        placeholder: t('register.orgName') + required,
      };

      const element2 = {
        name: 'email',
        label: t('register.email') + required,
        placeholder: t('register.email') + required,
      };

      const element3 = {
        name: 'phoneNumber',
        label: t('register.phoneNumber') + required,
        placeholder: t('register.phoneNumber') + required,
      };

      configColumn1.push(Object.assign({}, defaultField, element1));
      configColumn1.push(Object.assign({}, defaultField, element2));
      configColumn1.push(Object.assign({}, defaultField, element3));

      return configColumn1;
    };

    // Column 2 config of fields
    const creatConfigColumn2 = () => {
      const configColumn2 = [];
      const element1 = {
        name: 'address',
        label: t('register.address') + required,
        placeholder: t('register.address') + required,
      };

      const element2 = {
        name: 'city',
        label: t('register.city') + required,
        placeholder: t('register.city') + required,
      };

      const element3 = {
        name: 'province',
        label: t('register.province') + required,
        placeholder: t('register.province') + required,
      };

      const element4 = {
        name: 'postalCode',
        label: t('register.postalCode') + required,
        placeholder: t('register.postalCode') + required,
      };

      configColumn2.push(Object.assign({}, defaultField, element1));
      configColumn2.push(Object.assign({}, defaultField, element2));
      configColumn2.push(Object.assign({}, defaultField, element3));
      configColumn2.push(Object.assign({}, defaultField, element4));

      return configColumn2;
    };

    // Column 3 config of fields

    const creatConfigColumn3 = () => {
      const configColumn3 = [];
      const element1 = {
        name: 'adminFirstName',
        label: t('register.firstName'),
        placeholder: t('register.firstName'),
      };

      const element2 = {
        name: 'adminLastName',
        label: t('register.lastName'),
        placeholder: t('register.lastName'),
      };

      const element3 = {
        name: 'adminEmail',
        label: t('register.email') + required,
        placeholder: t('register.email') + required,
      };

      configColumn3.push(Object.assign({}, defaultField, element1));
      configColumn3.push(Object.assign({}, defaultField, element2));
      configColumn3.push(Object.assign({}, defaultField, element3));

      return configColumn3;
    };

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
                    {this.getInputFields(creatConfigColumn1())}
                  </Grid>
                  <Grid xs={4} className={classes.spacer} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.address')}
                    </h3>
                    {this.getInputFields(creatConfigColumn2())}
                  </Grid>
                  <Grid xs={4} className={classes.lastColumn} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.administrator')}
                    </h3>
                    {this.getInputFields(creatConfigColumn3())}
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
