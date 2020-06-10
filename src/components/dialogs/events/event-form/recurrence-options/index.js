import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  VALUE_RECURRENCE_OPTION_NONE,
  VALUE_RECURRENCE_OPTION_DAILY,
  VALUE_RECURRENCE_OPTION_BI_WEEKLY,
  VALUE_RECURRENCE_OPTION_WEEKLY,
  VALUE_RECURRENCE_OPTION_MONTHLY,
} from '../../../../common/constants';

export default function RecurrenceList() {
  const { t } = useTranslation('eventRecurrences');

  const options = [
    {
      value: VALUE_RECURRENCE_OPTION_DAILY,
      label: t('eventRecurrences:lblRecurrenceOptionDaily'),
    },
    {
      value: VALUE_RECURRENCE_OPTION_WEEKLY,
      label: t('eventRecurrences:lblRecurrenceOptionWeekly'),
    },
    {
      value: VALUE_RECURRENCE_OPTION_BI_WEEKLY,
      label: t('eventRecurrences:lblRecurrenceOptionBiWeekly'),
    },
    {
      value: VALUE_RECURRENCE_OPTION_MONTHLY,
      label: t('eventRecurrences:lblRecurrenceOptionMonthly'),
    },
  ];

  return (
    <>
      <option
        key={VALUE_RECURRENCE_OPTION_NONE}
        value={VALUE_RECURRENCE_OPTION_NONE}
        style={{ fontStyle: 'italic' }}
      >
        {t('eventRecurrences:lblRecurrenceOptionNone')}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}
