import React from 'react';
// import validate from './validate';
import Form from 'common/form';
import FormField from 'common/form-field';
import { Field } from 'redux-form/immutable';
//import { SubmitHandler } from 'redux-form';
import PropTypes from 'prop-types';
import { FORM_NAME } from './constants';
//import IPropTypes from 'react-immutable-proptypes';
import { Grid, withStyles, createStyles, Typography } from '@material-ui/core';

import { register } from 'auth/cognito-redux/actions';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
    field: {
      paddingBottom: 15,
    },
  });

class Registration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t, classes } = this.props;
    return (
      <div className={classes.root}>
        <Form
          onSubmit={register}
          form={FORM_NAME}
          submitLabel={t('register:register')}
        >
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='flex-end'
          >
            <Typography>Please Enter Organization Details</Typography>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='orgName'
                label={t('register:orgName')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='email'
                label={t('register:email')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='phoneNumber'
                label={t('register:phoneNumber')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='address'
                label={t('register:address')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='postalCode'
                label={t('register:postalCode')}
              />
            </Grid>
            <Typography>Caring Calendar Administrator</Typography>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='adminName'
                label={t('register:name')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='text'
                name='adminEmail'
                label={t('register:email')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='password'
                name='password'
                label={t('register:password')}
              />
            </Grid>
            <Grid className={classes.field} item>
              <Field
                required={true}
                component={FormField}
                type='password'
                name='confirmPassword'
                label={t('register:confirmPassword')}
              />
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  }
}

Registration.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(Registration);
