import React from 'react';
import { useTranslation } from 'react-i18next';

function WeekOfMonthList() {
  const { t } = useTranslation('eventRecurrences');

  const weekNames = [
    {
      value: '1',
      label: t('lblFirst'),
    },
    {
      value: '2',
      label: t('lblSecond'),
    },
    {
      value: '3',
      label: t('lblThird'),
    },
    {
      value: '4',
      label: t('lblFourth'),
    },
  ];

  return (
    <>
      {weekNames.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}

export default WeekOfMonthList;
