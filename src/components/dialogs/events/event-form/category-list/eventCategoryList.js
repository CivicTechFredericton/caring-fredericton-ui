import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

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
} from '../../../../common/constants';

import { useTranslation } from 'react-i18next';

// TODO: Can this be reused in the event creation dialog?
export default function EventCategoryList(props) {
  const { t } = useTranslation(['event', 'eventCategories']);
  const classes = useStyles();

  const { categories, onCategoryChange, isDisabled } = props;

  const checkForSelectedValue = (name) => {
    return categories.has(name);
  };

  const initialState = {
    // Selected event categories
    meals: checkForSelectedValue(VALUE_EVENT_CATEGORY_MEALS),
    grocery: checkForSelectedValue(VALUE_EVENT_CATEGORY_GROCERY),
    laundry: checkForSelectedValue(VALUE_EVENT_CATEGORY_LAUNDRY),
    social: checkForSelectedValue(VALUE_EVENT_CATEGORY_SOCIAL),
    showers: checkForSelectedValue(VALUE_EVENT_CATEGORY_SHOWERS),
    education: checkForSelectedValue(VALUE_EVENT_CATEGORY_EDUCATION),
    health: checkForSelectedValue(VALUE_EVENT_CATEGORY_HEALTH),
    hairCuts: checkForSelectedValue(VALUE_EVENT_CATEGORY_HAIR_CUTS),
    taxes: checkForSelectedValue(VALUE_EVENT_CATEGORY_TAXES),
    faith: checkForSelectedValue(VALUE_EVENT_CATEGORY_FAITH),
  };

  const [state, setState] = useState(initialState);

  // Handle category check box list events
  const handleCheckboxChange = (name) => (event) => {
    let checked = event.target.checked;
    let value = event.target.value;

    if (checked) {
      categories.add(value);
    } else {
      categories.delete(value);
    }

    setState((state) => ({
      ...state,
      [name]: checked,
    }));

    onCategoryChange(categories);
  };

  const categoryListRowOne = [
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
  ];

  const categoryListRowTwo = [
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

  const setFormControlLabel = (item) => {
    let ariaLabel = item.ariaLabel;

    return (
      <FormControlLabel
        key={item.id}
        className={classes.checkBoxField}
        control={
          <Checkbox
            disabled={isDisabled}
            checked={item.changeValue}
            onChange={handleCheckboxChange(item.id)}
            inputProps={{
              'aria-label': ariaLabel,
            }}
            value={item.id}
          />
        }
        label={item.label}
      />
    );
  };

  return (
    <div className={classes.root}>
      <FormLabel component='legend'>{t('event:lblCategories')}</FormLabel>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormGroup row>
          {categoryListRowOne.map((item) => {
            return setFormControlLabel(item);
          })}
        </FormGroup>
        <FormGroup row>
          {categoryListRowTwo.map((item) => {
            return setFormControlLabel(item);
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}

EventCategoryList.propTypes = {
  categories: PropTypes.array,
  onCategoryChange: PropTypes.func,
  isDisabled: PropTypes.boolean,
};
