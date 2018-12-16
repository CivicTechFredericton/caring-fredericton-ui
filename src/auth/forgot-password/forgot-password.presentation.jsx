import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { forgotPassword } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import FormField from 'common/form-field';
import Form from 'common/form';
import { forgotPasswordValidate } from './validate';
import { FORGOT_PASSWORD_FORM_NAME } from './constants';

class ForgotPassword extends AutobindComponent {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.forgotPasswordPage}>
        <Form
          form={FORGOT_PASSWORD_FORM_NAME}
          onSubmit={forgotPassword}
          header={t('forgotPassword:Reset Password')}
          submitLabel={t('forgotPassword:Reset Password')}
          validate={forgotPasswordValidate}
        >
          <Field
            required={true}
            component={FormField}
            type='text'
            name='username'
            label={t('forgotPassword:Username')}
          />
        </Form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ForgotPassword;
