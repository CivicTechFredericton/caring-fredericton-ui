import React, { useEffect, useState } from 'react';
import EventForm from '../event-form';

import moment from 'moment';

import { FORM_MODE_CREATE } from '../../../common/constants';

const roundMinutes = (date) => {
  const start = moment(date);
  const remainder = 30 - (start.minute() % 30);
  return moment(start).add(remainder, 'minute').startOf('minute');
};

const useFetch = (start, end) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const setDates = async () => {
      let newStart = start;
      let newEnd = end;

      if (!newStart) {
        newStart = roundMinutes(new Date());
      }

      if (!newEnd) {
        newEnd = moment(newStart).add(1, 'hour').toDate();
      }

      await setStartDate(newStart);
      await setEndDate(newEnd);
    };

    setDates();

    return () => {
      // Clean up the state
      setStartDate(null);
      setEndDate(null);
    };
  }, [start, end]);

  return {
    startDate: startDate,
    endDate: endDate,
  };
};

export default function NewEvent({
  show,
  handleClose,
  setLastUpdated,
  start,
  end,
}) {
  const { startDate, endDate } = useFetch(start, end);
  if (!endDate && !endDate) {
    return null;
  }

  return (
    <EventForm
      mode={FORM_MODE_CREATE}
      show={show}
      handleClose={handleClose}
      setLastUpdated={setLastUpdated}
      start={startDate}
      end={endDate}
    />
  );
}
