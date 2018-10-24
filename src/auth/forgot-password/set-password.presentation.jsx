import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { setPassword } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import FormField from 'common/form-field';
import Form from 'common/form';
import { setPasswordValidate } from './validate'
import { SET_PASSWORD_FORM_NAME } from './constants';


class SetPassword extends AutobindComponent {

  render() {
    const { t, initialValues } = this.props;
    return (
      <div className={ styles.forgotPasswordPage }>
        <Form
          form={SET_PASSWORD_FORM_NAME} onSubmit={ setPassword }
          header={ t('resetPassword:Reset Password') } submitLabel={ t('resetPassword:Reset Password') }
          validate={ setPasswordValidate } initialValues={initialValues}
        >
          <Field
            required={ true } component={ FormField }
            type="text" name="verificationCode" label={ t('forgotPassword:Verification Code') }
          />
          <Field
            required={ true } component={ FormField }
            type="password" name="password" label={ t('forgotPassword:Password') }
          />
          <Field
            required={ true } component={ FormField }
            type="password" name="confirmPassword" label={ t('forgotPassword:Confirm Password') }
          />
        </Form>
      </div>
      )
  }
}

SetPassword.propTypes = {
  t: PropTypes.func.isRequired
}

export default SetPassword;
