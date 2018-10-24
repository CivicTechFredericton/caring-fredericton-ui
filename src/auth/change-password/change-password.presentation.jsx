import React from 'react';
import styles from './index.scss';
import { FORM_NAME } from './constants.js';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { changePassword } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import { ERRORS } from 'auth/cognito-redux/constants';
import Form from 'common/form';
import FormField from 'common/form-field';

class ChangePassword extends AutobindComponent {

  render() {
    const { t } = this.props;

    return (
      <div className={styles.changePasswordPage}>
        <Form form={FORM_NAME} onSubmit={changePassword} header={t('changePassword:Change Password')} submitLabel={t('changePassword:Change Password')} >
          <Field
            required={true} component={FormField} type="password"
            name="oldPassword" label={t('changePassword:Old Password')}
          />
          <Field
            required={true} component={FormField} type="password"
            name="newPassword" label={t('changePassword:New Password')}
          />
          <Field
            required={true} component={FormField} type="password"
            name="confirmPassword" label={t('changePassword:Confirm Password')}
          />
        </Form>
      </div>
    )
  }
}

ChangePassword.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS))
  })
}

export default ChangePassword;
