import React from 'react';
import styles from './index.scss';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { verify } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import { ERRORS } from 'auth/cognito-redux/constants';
import Form from 'common/form';
import FormField from 'common/form-field';
import { FORM_NAME } from './constants';
import validate from './validate';

const VerifyError = ({ error, t, formValues }) => {

  if(error) {
    return (<div className={ styles.verifyError }>
      { t(`verify:${error.code}`, { username: formValues.get('username'), message: error.message }) }
    </div>);
  }

  return null;
}


class Verify extends AutobindComponent {

  render() {
    const { t, initialValues } = this.props;

    return (
      <div className={ styles.verifyPage }>
        <Form
          initialValues={ initialValues } onSubmit={ verify } validate={ validate }
          header={ 'Verify' } submitLabel={ 'Verify' } form={ FORM_NAME } >
          <Field
            required={ true } component={ FormField }
            type="text" name="code" label={ t('verify:code') }
          />
        </Form>

      </div>
    )
  }
}

VerifyError.propTypes = Verify.propTypes = {
  t: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.shape({
    code: PropTypes.oneOf(Object.values(ERRORS))
  }),
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

export default Verify;
