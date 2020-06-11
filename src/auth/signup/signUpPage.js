import React from 'react';
import formClasses from '../../components/common/form/form.module.scss';
import SuspenseView from '../../components/suspense-view';

import SignUpForm from './signUpForm';
import ConfirmCodeForm from './confirmCodeForm';

import { useTranslation } from 'react-i18next';

const SignUpPage = ({ match }) => {
  const { t, ready } = useTranslation([
    'authentication',
    'common',
    'error',
    'form',
  ]);

  const confirmEmail = match.params.confirmEmail;
  const showConfirmEmailForm = !!confirmEmail;
  const showSignUpForm = !showConfirmEmailForm;

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={formClasses.container}>
      {showSignUpForm && <SignUpForm t={t} />}
      {showConfirmEmailForm && <ConfirmCodeForm email={confirmEmail} t={t} />}
    </div>
  );
};

export default SignUpPage;
