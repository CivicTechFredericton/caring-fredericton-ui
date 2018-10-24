import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { login } from 'auth/cognito-redux/actions';
import AutobindComponent from 'common/autobind-component';
import validate from './validate';
import Form from 'common/form';
import FormField from 'common/form-field';
import { FORM_NAME } from './constants';


const MFASection = ({ t }) => {
  return (<fieldset>
    <Field
      required={ true } component={ FormField } type="text"
      name="mfaCode" label={ t('login:mfa_code') }
    />
  </fieldset>)
};

const NewPasswordSection = ({ t }) => {
  return (<fieldset>
    <Field required={ true } component={ FormField } type="password" name="newPassword" label={ t('login:new_password') } />
  </fieldset>);
};

const LoginSection = ({ t }) => {
  return ([
    <Field key='username' component={ FormField } type="text" name="username" label={ t('login:username') } />,
    <Field key='password' component={ FormField } type="password" name="password" label={ t('login:password') } />
  ])
};

const AdditionalAttributesSection = ({ attributesRequired, t }) => {
  return (<fieldset>
    {
      attributesRequired.map((attr, i) => (
        <div key={ `${attr}:${i}`}>
          <Field
            required={ true } component={ FormField } type="text"
            name={ `attributesData.${attr}` } label={ t(`login:${attr}`) }
          />
        </div>
      ))
    }
  </fieldset>);
};

class Login extends AutobindComponent {
  render() {
    const { t, newPasswordRequired, attributesRequired, mfaRequired } = this.props;

    const loginRequired = !newPasswordRequired && !attributesRequired && !mfaRequired;

    return (
      <div className={ styles.loginPage }>
        <Form onSubmit={ login } validate={ validate } form={ FORM_NAME } header={ t('login:login') } submitLabel={ t('login:login') }>
          {
            (formsProps) => ([
              (loginRequired ? <LoginSection key='loginSection' { ...formsProps } /> : null),
              (newPasswordRequired ? <NewPasswordSection key='newPasswordSection' { ...formsProps } /> : null),
              (attributesRequired ? <AdditionalAttributesSection key='additionalAttrSection' { ...formsProps } { ...this.props } /> : null),
              (mfaRequired ? <MFASection key='mfaSection' { ...formsProps } /> : null)
            ])
          }
        </Form>
          <Link to={{
            pathname: '/register'
          }}>{ t('login:lbl_register_now') }</Link>
          <Link to={{
            pathname: '/forgot-password'
          }}>{ t('login:lbl_forgot_password') }</Link>
      </div>
      )
  }
}

Login.propTypes = LoginSection.propTypes = MFASection.propTypes =
AdditionalAttributesSection.propTypes =
NewPasswordSection.propTypes = Login.propTypes = {
  t: PropTypes.func.isRequired,
  newPasswordRequired: PropTypes.bool,
  attributesRequired: PropTypes.arrayOf(PropTypes.string),
  mfaRequired: IPropTypes.mapContains({
    session: PropTypes.string.isRequired
  })
};

export default Login;
