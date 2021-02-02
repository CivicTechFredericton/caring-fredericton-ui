import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import EventForm from '../event-form';
import moment from 'moment';

import { useTranslation } from 'react-i18next';

import { getEventDetails } from '../../../../api/event';

import { FORM_MODE_EDIT } from '../../../common/constants';

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

export default function EditEvent({
  show,
  handleClose,
  setLastUpdated,
  event,
}) {
  const { t } = useTranslation('error');

  const response = useFetch(event);

  if (!response.data) {
    if (response.error) {
      return (
        <form>
          <div>{t('error:eventDoesNotExist')}</div>
        </form>
      );
    }

    return null;
  }

  const editEventData = response.data;

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

  return (
    <EventForm
      mode={FORM_MODE_EDIT}
      editEventData={editEventData}
      show={show}
      handleClose={handleClose}
      setLastUpdated={setLastUpdated}
      start={eventStartDate}
      end={eventEndDate}
    />
  );
}

EditEvent.propTypes = {
  show: PropTypes.any,
  handleClose: PropTypes.func,
  setLastUpdated: PropTypes.func,
  event: PropTypes.object,
};
