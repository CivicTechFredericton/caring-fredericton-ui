import React from 'react';

import { useTranslation } from 'react-i18next';
import useStyles from './styles';

function Footer() {
  const { t } = useTranslation('common');
  const classes = useStyles();

  return <div className={classes.footer}>{t('common:lblFooterText')}</div>;
}

export default Footer;
