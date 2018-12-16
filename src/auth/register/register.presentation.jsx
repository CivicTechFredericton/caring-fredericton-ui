import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { register } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import { ERRORS } from 'auth/cognito-redux/constants';
import Form from 'common/form';
import FormField from 'common/form-field';

class Register extends AutobindComponent {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.registerPage}>
        <Form
          form='register'
          onSubmit={register}
          header={t('register:register')}
          submitLabel={t('register:register')}
        >
          <Field
            required={true}
            component={FormField}
            type='text'
            name='username'
            label={t('register:email')}
          />
          <Field
            required={true}
            component={FormField}
            type='password'
            name='password'
            label={t('register:password')}
          />
          <Field
            required={true}
            component={FormField}
            type='password'
            name='confirmPassword'
            label={t('register:confirm_password')}
          />
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS)),
  }),
};

export default Register;
