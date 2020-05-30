import React from 'react';
import { useTranslation } from 'react-i18next';

function DayOfWeekList() {
  const { t } = useTranslation('eventRecurrences');

  const dayNames = [
    {
      value: '1',
      label: t('lblDayMonday'),
    },
    {
      value: '2',
      label: t('lblDayTuesday'),
    },
    {
      value: '3',
      label: t('lblDayWednesday'),
    },
    {
      value: '4',
      label: t('lblDayThursday'),
    },
    {
      value: '5',
      label: t('lblDayFriday'),
    },
    {
      value: '6',
      label: t('lblDaySaturday'),
    },
    {
      value: '7',
      label: t('lblDaySunday'),
    },
  ];

  return (
    <>
      {dayNames.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}

export default DayOfWeekList;
