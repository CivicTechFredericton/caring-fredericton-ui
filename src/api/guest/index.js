import { awsApiRequest } from '../utils/func';
import { API_DATE_FORMAT } from '../utils/constants';

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
      path: '/guests/events',
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
      path: `/guests/organizations/${orgId}/events/${eventId}`,
      params: {
        queryStringParameters: queryStringParameters,
      },
    });
  } catch (error) {
    return error;
  }
}
