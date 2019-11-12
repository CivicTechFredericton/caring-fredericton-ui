import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  Button,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { registerOrganization } from '../../api/endpoints';
import { getSession } from '../../api/cognito';

import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import validation from './validation';
import styles from './styles';

class Organization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openCancel: false,
      fullWidth: true,
      maxWidth: 'md',
    };
  }

  initValues = userDetails => {
    let intOjt = {
      orgName: '',
      orgEmail: '',
      phoneNumber: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
      administrator_id: '',
      adminFirstName: '',
      adminLastName: '',
      adminEmail: '',
    };

    intOjt = Object.assign({}, intOjt, userDetails);
    return intOjt;
  };

  transformOrganizationDetails = (values, userDetails) => {
    let orgRequest = {
      name: values.orgName,
      email: values.orgEmail,
      phone: values.phoneNumber,
      administrator_id: userDetails.administrator_id,
      address: {
        street: values.street,
        city: values.city,
        province: values.province,
        postal_code: values.postalCode,
        country: 'Canada',
      },
    };

    return orgRequest;
  };

  // Handle confirmation close dialog
  openConfirmModel = () => {
    this.setState({ openCancel: true });
  };

  closeConfirmModel = () => {
    this.setState({ openCancel: false });
  };

  handleDialogClose = () => {
    this.setState({ openCancel: false });
    this.props.handleClose();
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
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    ));
  };

  render() {
    const { t, classes, userDetails } = this.props;

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
        disabled: true,
      };

      const lastNameElement = {
        name: 'adminLastName',
        label: t('register.lastName'),
        placeholder: t('register.lastName'),
        disabled: true,
      };

      const adminEmailElement = {
        name: 'adminEmail',
        label: t('register.email'),
        placeholder: t('register.email'),
        disabled: true,
      };

      const adminColumn = [];
      adminColumn.push(Object.assign({}, defaultField, firstNameElement));
      adminColumn.push(Object.assign({}, defaultField, lastNameElement));
      adminColumn.push(Object.assign({}, defaultField, adminEmailElement));

      return adminColumn;
    };

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.show}
          aria-labelledby='form-dialog-title'
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Grid item className={classes.flex}>
                {t('dialogs.registerOrganization')}
              </Grid>
              <Grid item>
                <Tooltip title={t('common.btnClose')}>
                  <IconButton
                    color='inherit'
                    onClick={this.openConfirmModel}
                    aria-label='Close'
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={this.state.openCancel}
                  onClose={this.closeConfirmModel}
                  aria-labelledby='form-dialog-title'
                >
                  <DialogTitle>{t('common.discardChanges')}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleDialogClose}>
                      {t('common.btnYes')}
                    </Button>
                    <Button onClick={this.closeConfirmModel} autoFocus>
                      {t('common.btnNo')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='center'
            >
              <Formik
                initialValues={this.initValues(userDetails)}
                validate={values => validation(t, values)}
                onSubmit={(values, { setSubmitting }) => {
                  getSession(token => {
                    const valuesTransform = this.transformOrganizationDetails(
                      values,
                      userDetails
                    );

                    registerOrganization(token.idToken, valuesTransform).then(
                      () => {
                        setSubmitting(false);
                        this.props.handleClose();
                      }
                    );
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
                      {t('register.register')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Organization.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  userDetails: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Organization);
