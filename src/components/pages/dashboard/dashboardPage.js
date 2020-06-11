import React from 'react';
import AppCalendar from '../../calendar';
import SuspenseView from '../../suspense-view';

import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

import logo from '../../../logo.png';

function DashboardPage() {
  const { t, ready } = useTranslation(['common']);
  const classes = useStyles();

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={10}>
          <AppCalendar />
        </Grid>
        <Grid item xs={1}>
          <img
            src={logo}
            alt={t('common:ccLogoIcon')}
            height='128'
            width='128'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardPage;
