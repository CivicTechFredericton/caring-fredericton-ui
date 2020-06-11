import React, { useEffect, useState } from 'react';
import SuspenseView from '../../suspense-view';
import { useTranslation } from 'react-i18next';

import EventListView from './event-list-view';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';
import logo from '../../../logo.png';
import useStyles from './styles';

import { getEventList } from '../../../api/guest';

const start = moment().toDate();
const end = moment().add(7, 'days').toDate();

const useFetch = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data, errorMessage } = await getEventList(
        startDate,
        endDate,
        []
      );
      if (success) {
        await setData(data);
      } else {
        await setError(errorMessage);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { data, error };
};

function HomePage() {
  const { t, ready } = useTranslation(['common']);
  const classes = useStyles();

  // Set the date range
  const response = useFetch(start, end);

  if (!response.data) {
    if (response.error) {
      return (
        <form>
          <div>Loading...</div>
        </form>
      );
    }

    return <SuspenseView />;
  }

  const responseData = response.data;

  if (!ready) {
    return <SuspenseView />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={9} lg={4}>
          <h2>{t('common:lblWelcome')}</h2>
          <EventListView events={responseData} />
        </Grid>
        <Grid item xs={3}>
          <img
            src={logo}
            alt={t('common:ccLogoIcon')}
            height='320'
            width='320'
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
