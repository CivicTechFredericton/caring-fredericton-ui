import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import useStyles from './styles';

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
} from '../../constants';

import { useTranslation } from 'react-i18next';

// TODO: Can this be reused in the event creation dialog?
export default function EventCategoryFilter(props) {
  const { t } = useTranslation(['event', 'eventCategories']);
  const classes = useStyles();

  const initialState = {
    // Selected event categories
    meals: false,
    grocery: false,
    laundry: false,
    social: false,
    showers: false,
    education: false,
    health: false,
    hairCuts: false,
    taxes: false,
    faith: false,
  };

  const [state, setState] = useState(initialState);

  // Handle category check box list events
  const handleCheckboxChange = (name) => (event) => {
    let checked = event.target.checked;
    let value = event.target.value;
    let categories = props.categories;

    if (checked) {
      categories.add(value);
    } else {
      categories.delete(value);
    }

    setState((state) => ({
      ...state,
      [name]: checked,
    }));

    props.onCategoryChange(categories);
  };

  const filterConfig = [
    {
      id: VALUE_EVENT_CATEGORY_MEALS,
      label: t('eventCategories:lblMeals'),
      changeValue: state.meals,
      ariaLabel: t('eventCategories:lblSelectMeals'),
    },
    {
      id: VALUE_EVENT_CATEGORY_GROCERY,
      label: t('eventCategories:lblGrocery'),
      changeValue: state.grocery,
      ariaLabel: t('eventCategories:lblSelectGrocery'),
    },
    {
      id: VALUE_EVENT_CATEGORY_LAUNDRY,
      label: t('eventCategories:lblLaundry'),
      changeValue: state.laundry,
      ariaLabel: t('eventCategories:lblSelectLaundry'),
    },
    {
      id: VALUE_EVENT_CATEGORY_SOCIAL,
      label: t('eventCategories:lblSocial'),
      changeValue: state.social,
      ariaLabel: t('eventCategories:lblSelectSocial'),
    },
    {
      id: VALUE_EVENT_CATEGORY_SHOWERS,
      label: t('eventCategories:lblShowers'),
      changeValue: state.showers,
      ariaLabel: t('eventCategories:lblSelectShowers'),
    },
    {
      id: VALUE_EVENT_CATEGORY_EDUCATION,
      label: t('eventCategories:lblEducation'),
      changeValue: state.education,
      ariaLabel: t('eventCategories:lblSelectEducation'),
    },
    {
      id: VALUE_EVENT_CATEGORY_HEALTH,
      label: t('eventCategories:lblHealth'),
      changeValue: state.health,
      ariaLabel: t('eventCategories:lblSelectHealth'),
    },
    {
      id: VALUE_EVENT_CATEGORY_HAIR_CUTS,
      label: t('eventCategories:lblHairCuts'),
      changeValue: state.hairCuts,
      ariaLabel: t('eventCategories:lblSelectHairCuts'),
    },
    {
      id: VALUE_EVENT_CATEGORY_TAXES,
      label: t('eventCategories:lblTaxes'),
      changeValue: state.taxes,
      ariaLabel: t('eventCategories:lblSelectTaxes'),
    },
    {
      id: VALUE_EVENT_CATEGORY_FAITH,
      label: t('eventCategories:lblFaith'),
      changeValue: state.faith,
      ariaLabel: t('eventCategories:lblSelectFaith'),
    },
  ];

  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        {filterConfig.map((result) => {
          let ariaLabel = result.ariaLabel;
          return (
            <FormControlLabel
              key={result.id}
              control={
                <Checkbox
                  checked={result.changeValue}
                  onChange={handleCheckboxChange(result.id)}
                  inputProps={{
                    'aria-label': ariaLabel,
                  }}
                  value={result.id}
                />
              }
              label={result.label}
            />
          );
        })}
      </FormControl>
    </div>
  );
}

EventCategoryFilter.propTypes = {
  categories: PropTypes.object,
  onCategoryChange: PropTypes.func,
};
