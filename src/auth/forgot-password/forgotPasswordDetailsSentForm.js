import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordDetailsSentForm = ({ t }) => {
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
};

export default ForgotPasswordDetailsSentForm;
