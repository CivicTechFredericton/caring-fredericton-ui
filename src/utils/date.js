//import momentTz from 'moment-timezone';
import moment from 'moment';

export const convertToCalendar = (date, time) => {
  return date + 'T' + time;
};

export const convertDateToUTC = () => {
  const dateToStore = Date.now();

  const momentDate = moment.utc(dateToStore);
  //momentObject(2018-01-27T10:30:00+01:00)
  //console.log("moment", dateToStore, momentDate, moment(momentDate).format('YYYY-MM-DD HH:mm') ," date utc ", moment(momentDate).local().format('YYYY-MM-DD HH:mm') );
  return momentDate;
};
