import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, withStyles, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { getOrganizatonDetails, validateOrganization } from '../api/endpoints';
import { getSession, isValidUser } from '../api/cognito';

import styles from './styles';

class Verification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orgDetails: null,
    };
  }

  componentDidMount() {
    // Call to get the user details
    if (isValidUser()) {
      getSession(token => {
        getOrganizatonDetails(
          token.idToken,
          // TODO: Retrieve the org id from the path
          'f0a8802f-7eb9-460e-9276-dada5cd3bf4c'
        ).then(result => {
          console.log(result);
          const organization = Object.assign(
            {},
            {
              orgName: result.name,
              orgEmail: result.email,
              phoneNumber: result.phone,
              street: result.address.street,
              city: result.address.city,
              province: result.address.province,
              postalCode: result.address.postal_code,
              adminFirstName: result.administrator_details.first_name,
              adminLastName: result.administrator_details.last_name,
              adminEmail: result.administrator_details.email,
            },
            result
          );
          this.setState({ intOjt: organization });
        });
      });
    }
  }

  //create generic reusable input field
  getInputFields = configData => {
    const { classes } = this.props;

    return configData.map(value => (
      <Grid key={value.name} className={classes.field} item>
        <Field
          disabled={true}
          component={value.component}
          type={value.text}
          name={value.name}
          label={value.label}
          className={value.className}
          margin={value.margin}
          variant={value.variant}
          placeholder={value.placeholder}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    ));
  };

  render() {
    const { t, classes } = this.props;

    // Default field properties
    const defaultField = {
      component: TextField,
      type: 'text',
      name: '',
      label: '',
      className: classes.textField,
      margin: 'normal',
      variant: 'outlined',
      placeholder: '',
    };

    // Details Fields
    const createOrganizationDetailsColumn = () => {
      const nameElement = {
        name: 'orgName',
        label: t('register.orgName'),
        placeholder: t('register.orgName'),
      };

      const emailElement = {
        name: 'orgEmail',
        label: t('register.email'),
        placeholder: t('register.email'),
      };

      const phoneElement = {
        name: 'phoneNumber',
        label: t('register.phoneNumber'),
        placeholder: t('register.phoneNumber'),
      };

      const detailsColumn = [];
      detailsColumn.push(Object.assign({}, defaultField, nameElement));
      detailsColumn.push(Object.assign({}, defaultField, emailElement));
      detailsColumn.push(Object.assign({}, defaultField, phoneElement));

      return detailsColumn;
    };

    // Address Fields
    const createLocationDetailsColumn = () => {
      const streetElement = {
        name: 'street',
        label: t('register.address'),
        placeholder: t('register.address'),
      };

      const cityElement = {
        name: 'city',
        label: t('register.city'),
        placeholder: t('register.city'),
      };

      const provinceElement = {
        name: 'province',
        label: t('register.province'),
        placeholder: t('register.province'),
      };

      const postalCodeElement = {
        name: 'postalCode',
        label: t('register.postalCode'),
        placeholder: t('register.postalCode'),
      };

      // TODO: Add country drop down
      const locationColumn = [];
      locationColumn.push(Object.assign({}, defaultField, streetElement));
      locationColumn.push(Object.assign({}, defaultField, cityElement));
      locationColumn.push(Object.assign({}, defaultField, provinceElement));
      locationColumn.push(Object.assign({}, defaultField, postalCodeElement));

      return locationColumn;
    };

    // Administrator Name Details
    const createAdminDetailsColumn = () => {
      const firstNameElement = {
        name: 'adminFirstName',
        label: t('register.firstName'),
        placeholder: t('register.firstName'),
      };

      const lastNameElement = {
        name: 'adminLastName',
        label: t('register.lastName'),
        placeholder: t('register.lastName'),
      };

      const adminEmailElement = {
        name: 'adminEmail',
        label: t('register.email'),
        placeholder: t('register.email'),
      };

      const adminColumn = [];
      adminColumn.push(Object.assign({}, defaultField, firstNameElement));
      adminColumn.push(Object.assign({}, defaultField, lastNameElement));
      adminColumn.push(Object.assign({}, defaultField, adminEmailElement));

      return adminColumn;
    };

    return (
      <div className={classes.root}>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          <h2 className={classes.title}>{t('register.validation')}</h2>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.intOjt}
            onSubmit={(values, { setSubmitting }) => {
              getSession(token => {
                // TODO: Pull the organization ID from the history
                validateOrganization(
                  token.idToken,
                  'f0a8802f-7eb9-460e-9276-dada5cd3bf4c'
                ).then(setSubmitting(false));
              });
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
                    {this.getInputFields(createOrganizationDetailsColumn())}
                  </Grid>
                  <Grid xs={4} className={classes.spacer} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.address')}
                    </h3>
                    {this.getInputFields(createLocationDetailsColumn())}
                  </Grid>
                  <Grid xs={4} className={classes.lastColumn} item>
                    <h3 className={classes.columnTitle}>
                      {t('register.administrator')}
                    </h3>
                    {this.getInputFields(createAdminDetailsColumn())}
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {t('register.validate')}
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    );
  }
}

Verification.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  history: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(Verification);
