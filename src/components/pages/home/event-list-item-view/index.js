import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import EventIcon from '@material-ui/icons/Event';

import EventDetailsDialog from '../../../dialogs/event-details';

import moment from 'moment';

import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const EventListItemView = ({ event }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);

  const openEventDialog = (event) => {
    setShowDialog(true);
  };

  const closeEventDialog = () => {
    setShowDialog(false);
  };

  let eventName = event.name;
  let eventStartDate = moment(event.start_date + ' ' + event.start_time)
    .utc('YYYY-MM-DD HH:mm:ss')
    .local();

  let eventEndDate = moment(event.end_date + ' ' + event.end_time)
    .utc('YYYY-MM-DD HH:mm:ss')
    .local();

  let start = eventStartDate.format('MMMM DD');
  let startTime = eventStartDate.format('LT');
  let endTime = eventEndDate.format('LT');

  return (
    <div>
      <ListItem key={event.id} disableGutters={true}>
        <ListItemIcon edge='start' className={classes.listItemIcon}>
          {start}
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant='h6'>{eventName}</Typography>}
          secondary={
            <>
              <Typography
                component='span'
                variant='body1'
                style={{ color: 'grey' }}
              >
                {startTime} - {endTime}
              </Typography>
              <br />
              <Link
                color='primary'
                onClick={() => {
                  openEventDialog();
                }}
              >
                {t('common:lnkAdditionalDetails')}
              </Link>
            </>
          }
        />
        <ListItemSecondaryAction>
          <EventIcon edge='end' />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant='inset' component='li' />
      <EventDetailsDialog
        show={showDialog}
        handleClose={closeEventDialog}
        event={event}
      />
    </div>
  );
};

export default EventListItemView;
