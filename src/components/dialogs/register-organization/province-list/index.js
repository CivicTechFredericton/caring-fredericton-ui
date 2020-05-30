import React from 'react';
import { useTranslation } from 'react-i18next';

import { VALUE_SELECT } from '../../../common/constants';

function ProvinceList() {
  const { t } = useTranslation(['common', 'provinces']);

  const provinceNames = [
    {
      value: VALUE_SELECT,
      label: t('common:lblSelect'),
    },
    {
      value: 'AB',
      label: t('provinces:lblAlberta'),
    },
    {
      value: 'BC',
      label: t('provinces:lblBritishColumbia'),
    },
    {
      value: 'MB',
      label: t('provinces:lblManitoba'),
    },
    {
      value: 'NB',
      label: t('provinces:lblNewBrunswick'),
    },
    {
      value: 'NL',
      label: t('provinces:lblNewfoundland'),
    },
    {
      value: 'NT',
      label: t('provinces:lblNorthwestTerritories'),
    },
    {
      value: 'NS',
      label: t('provinces:lblNovaScotia'),
    },
    {
      value: 'NU',
      label: t('provinces:lblNunavut'),
    },
    {
      value: 'ON',
      label: t('provinces:lblOntario'),
    },
    {
      value: 'PE',
      label: t('provinces:lblPrinceEdwardIsland'),
    },
    {
      value: 'QC',
      label: t('provinces:lblQuebec'),
    },
    {
      value: 'SK',
      label: t('provinces:lblSaskatchewan'),
    },
    {
      value: 'YT',
      label: t('provinces:lblYukon'),
    },
  ];

  return (
    <>
      {provinceNames.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}

export default ProvinceList;
