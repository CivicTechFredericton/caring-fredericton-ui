import _ from 'lodash';
import React from 'react';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import EventListItemView from '../event-list-item-view';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';

const EventListView = ({ events }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  if (_.get(events, 'length', 0) === 0) {
    return (
      <div>
        <Typography variant='h6'>{t('common:lblNoEventsScheduled')}</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant='h6'>{t('common:lblUpcomingEvents')}</Typography>
      <div style={{ maxHeight: 375, overflow: 'auto' }}>
        <List className={classes.root}>
          {events.map((entry) => (
            <EventListItemView
              key={entry.id + '-' + entry.occurrence}
              event={entry}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default EventListView;
