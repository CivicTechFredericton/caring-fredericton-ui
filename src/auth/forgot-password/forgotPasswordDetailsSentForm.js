import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ForgotPasswordDetailsSentForm({ t }) {
  return (
    <form>
      <div>
        <h3>{t('authentication:forgotPasswordRequestSuccess')}</h3>
        <div>
          <Link to='/'>{t('common:home')}</Link>
        </div>
      </div>
    </form>
  );
}

ForgotPasswordDetailsSentForm.propTypes = {
  t: PropTypes.object,
};
