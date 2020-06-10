import { awsApiRequest } from '../utils/func';
import { API_DATE_FORMAT, API_TIME_FORMAT } from '../utils/constants';

import moment from 'moment';

export async function getEventList(startDate, endDate, categories) {
  const queryStringParameters = {
    start_date: moment(startDate).format(API_DATE_FORMAT),
    end_date: moment(endDate).format(API_DATE_FORMAT),
    categories: categories,
  };

  try {
    return await awsApiRequest({
      method: 'GET',
      path: '/events',
      params: {
        queryStringParameters: queryStringParameters,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function getEventDetails(orgId, eventId, occurrenceNum) {
  const queryStringParameters = {
    occurrence_num: occurrenceNum,
  };

  try {
    return await awsApiRequest({
      method: 'GET',
      path: `/organizations/${orgId}/events/${eventId}`,
      params: {
        queryStringParameters: queryStringParameters,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function createEvent(orgId, values) {
  try {
    let start = values.start;
    let end = values.end;

    const body = {
      name: values.title,
      description: values.description,
      contact_email: values.contactEmail,
      location: values.location,
      categories: values.categories,
      start_date: start.format(API_DATE_FORMAT),
      end_date: end.format(API_DATE_FORMAT),
      start_time: start.format(API_TIME_FORMAT),
      end_time: end.format(API_TIME_FORMAT),
      timezone: values.timezone,
      is_recurring: values.recurring,
      recurrence_details: values.recurrenceDetails,
    };

    return await awsApiRequest({
      method: 'POST',
      path: `/organizations/${orgId}/events`,
      params: {
        body: body,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function editEvent(orgId, eventId, values) {
  try {
    const body = {
      name: values.title,
      description: values.description,
      contact_email: values.contactEmail,
      location: values.location,
      categories: values.categories,
    };

    return await awsApiRequest({
      method: 'PUT',
      path: `/organizations/${orgId}/events/${eventId}`,
      params: {
        body: body,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function cancelEvent(orgId, eventId) {
  try {
    return await awsApiRequest({
      method: 'DELETE',
      path: `/organizations/${orgId}/events/${eventId}`,
    });
  } catch (error) {
    return error;
  }
}
