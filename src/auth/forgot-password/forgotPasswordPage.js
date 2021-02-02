import React from 'react';
import PropTypes from 'prop-types';

import formClasses from '../../components/common/form/form.module.scss';
import SuspenseView from '../../components/suspense-view';
import * as QueryString from 'query-string';

import ForgotPasswordForm from './forgotPasswordForm';
import ForgotPasswordDetailsSentForm from './forgotPasswordDetailsSentForm';

import { useTranslation } from 'react-i18next';

export default function ForgotPasswordPage({ location }) {
  const { t, ready } = useTranslation([
    'common',
    'error',
    'form',
    'authentication',
  ]);

  const queryParams = QueryString.parse(location.search);
  // TODO: Handle success or failure for messaging?
  const showMessage = !!queryParams.success;
  const showForgotPasswordForm = !showMessage;

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={formClasses.container}>
      {showForgotPasswordForm && <ForgotPasswordForm t={t} />}
      {showMessage && <ForgotPasswordDetailsSentForm t={t} />}
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};
