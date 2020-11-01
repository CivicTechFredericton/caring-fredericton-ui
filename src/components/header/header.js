import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import styles from './header.module.scss';

import Button from '@material-ui/core/Button';

import RegisterOrganizationDialog from '../dialogs/register-organization';

import useAuthDataContext from '../../auth/hooks/useAuthDataContext';
import { useTranslation } from 'react-i18next';

import ctlogo from '../../civic-tech-logo.png';

const SignedInControls = ({ t, user, signOut }) => {
  const [showDialog, setShowDialog] = useState(false);

  let showRegistrationButton = user && !user.organization_id;

  let path = window.location.pathname;
  let pathSegments = path.split('/');
  let pathOne = pathSegments[1];
  if (pathOne === 'validation') {
    showRegistrationButton = false;
  }

  // Register Organization Dialog Methods
  const openRegisterDialog = () => {
    setShowDialog(true);
  };

  const closeRegisterDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      {showRegistrationButton ? (
        <Button onClick={openRegisterDialog}>
          {t('common:btnRegisterOrganization')}
        </Button>
      ) : null}
      <Button onClick={signOut}>{t('authentication:signOut')}</Button>
      <div hidden>
        <RegisterOrganizationDialog
          show={showDialog}
          handleClose={closeRegisterDialog}
        />
      </div>
    </>
  );
};

SignedInControls.propTypes = {
  t: PropTypes.func,
  user: PropTypes.object,
  signOut: PropTypes.func,
};

function Header() {
  const { isSignedIn, user, signOut } = useAuthDataContext();
  const { t } = useTranslation(['common', 'authentication']);
  const history = useHistory();

  return (
    <div className={styles.header}>
      <div className={styles.image}>
        <img
          height='30'
          width='100'
          src={ctlogo}
          alt={t('common:ctLogoIcon')}
        />
        <span className={styles.space}></span>
      </div>
      <div>
        {isSignedIn ? (
          <SignedInControls t={t} user={user} signOut={signOut} />
        ) : (
          <Button onClick={() => history.push('/signin')}>
            {t('authentication:signIn')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
