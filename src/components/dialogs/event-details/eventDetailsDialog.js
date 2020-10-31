import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DialogTitle from '../common/dialog-title';

import moment from 'moment';

import useStyles from './styles';

import { useTranslation } from 'react-i18next';

import { getEventDetails } from '../../../api/guest';

import {
  VALUE_EVENT_CATEGORY_MEALS,
  VALUE_EVENT_CATEGORY_GROCERY,
  VALUE_EVENT_CATEGORY_LAUNDRY,
  VALUE_EVENT_CATEGORY_SOCIAL,
  VALUE_EVENT_CATEGORY_SHOWERS,
  VALUE_EVENT_CATEGORY_EDUCATION,
  VALUE_EVENT_CATEGORY_HEALTH,
  VALUE_EVENT_CATEGORY_HAIR_CUTS,
  VALUE_EVENT_CATEGORY_TAXES,
  VALUE_EVENT_CATEGORY_FAITH,
} from '../../common/constants';

const useFetch = (eventObj) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (eventObj) {
        const { success, data, errorMessage } = await await getEventDetails(
          eventObj.owner,
          eventObj.id,
          eventObj.occurrence_num
        );
        if (success) {
          await setData(data);
        } else {
          await setError(errorMessage);
        }
      }
    };

    fetchData();

    return () => {
      // Clean up the state
      setData(null);
      setError(null);
    };
  }, [eventObj]);

  return { data, error };
};

function EventDetailsDialog({ show, handleClose, event }) {
  const [maxWidth] = useState('xs');

  const { t } = useTranslation([
    'common',
    'eventCategories',
    'eventDetails',
    'form',
  ]);

  const classes = useStyles();

  // Category filter name localization
  const localizeEventCategory = (category) => {
    if (category === VALUE_EVENT_CATEGORY_MEALS) {
      return t('eventCategories:lblMeals');
    }

    if (category === VALUE_EVENT_CATEGORY_GROCERY) {
      return t('eventCategories:lblGrocery');
    }

    if (category === VALUE_EVENT_CATEGORY_LAUNDRY) {
      return t('eventCategories:lblLaundry');
    }

    if (category === VALUE_EVENT_CATEGORY_SOCIAL) {
      return t('eventCategories:lblSocial');
    }

    if (category === VALUE_EVENT_CATEGORY_SHOWERS) {
      return t('eventCategories:lblShowers');
    }

    if (category === VALUE_EVENT_CATEGORY_EDUCATION) {
      return t('eventCategories:lblEducation');
    }

    if (category === VALUE_EVENT_CATEGORY_HEALTH) {
      return t('eventCategories:lblHealth');
    }

    if (category === VALUE_EVENT_CATEGORY_HAIR_CUTS) {
      return t('eventCategories:lblHairCuts');
    }

    if (category === VALUE_EVENT_CATEGORY_TAXES) {
      return t('eventCategories:lblTaxes');
    }

    if (category === VALUE_EVENT_CATEGORY_FAITH) {
      return t('eventCategories:lblFaith');
    }
  };

  const response = useFetch(event);

  if (!response.data) {
    if (response.error) {
      return null;
    }

    return null;
  }

  const editEventData = response.data;

  // Set the remainder of the values
  let eventStartDate = moment(
    editEventData.start_date + ' ' + editEventData.start_time
  )
    .utc('YYYY-MM-DD HH:mm:ss')
    .local();

  let eventEndDate = moment(
    editEventData.end_date + ' ' + editEventData.end_time
  )
    .utc('YYYY-MM-DD HH:mm:ss')
    .local();

  let name = editEventData.name;
  let orgName = editEventData.owner_name;
  let location = editEventData.location;
  let contactEmail = editEventData.contact_email;
  let description = editEventData.description;
  let categories = editEventData.categories;
  let showCategories = _.get(categories, 'length', 0) !== 0;
  let start = eventStartDate.format('LLL');
  let end = eventEndDate.format('LLL');

  return (
    <div className={classes.root}>
      <Dialog
        maxWidth={maxWidth}
        open={show}
        aria-labelledby='event-dialog-title'
      >
        <DialogTitle id='event-dialog-title'>{name}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid className={classes.spacer} item>
              <Typography>{t('eventDetails:lblStarts') + start}</Typography>
              <Typography>{t('eventDetails:lblEnds') + end}</Typography>
              {description ? (
                <Typography>
                  {t('eventDetails:lblDescription') + description}
                </Typography>
              ) : null}
              <Typography>
                {t('eventDetails:lblOrganization') + orgName}
              </Typography>
              <Typography>
                {t('eventDetails:lblLocation') + location}
              </Typography>
              <Typography>
                {t('eventDetails:lblContact') + contactEmail}
              </Typography>
              {showCategories ? (
                <Typography>{t('eventDetails:lblCategories')}</Typography>
              ) : null}
              {categories.map((item, index) => (
                <li key={index} style={{ textIndent: '15px' }}>
                  {localizeEventCategory(item)}
                </li>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant='text' color='inherit' onClick={handleClose}>
            {t('form:close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EventDetailsDialog.propTypes = {
  show: PropTypes.func,
  handleClose: PropTypes.func,
  event: PropTypes.object,
};

export default EventDetailsDialog;
