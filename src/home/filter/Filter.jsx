import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, createStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
  });

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Category options
      categoriesFilterSet: new Set(),
      mealsFilter: true,
      laundryFilter: true,
      socialFilter: true,
      showersFilter: true,
      educationFilter: true,
      healthFilter: true,
      hairCutsFilter: true,
      taxesFilter: true,
      faithFilter: true,
    };
  }

  // Handle category check box list events
  handleFilterChange = name => event => {
    let checked = event.target.checked;
    let value = event.target.value;
    let categories = this.state.categoriesFilterSet;

    if (checked) {
      categories.add(value);
    } else {
      categories.delete(value);
    }

    this.setState({
      [name]: checked,
      categoriesFilterSet: categories,
    });
  };

  render() {
    const { classes, t } = this.props;
    const filterConfig = [
      {
        id: 'mealsFilter',
        label: t('filter.meals'),
        changeValue: this.state.mealsFilter,
      },
      {
        id: 'laundryFilter',
        label: t('filter.laundry'),
        changeValue: this.state.laundryFilter,
      },
      {
        id: 'socialFilter',
        label: t('filter.social'),
        changeValue: this.state.socialFilter,
      },
      {
        id: 'showersFilter',
        label: t('filter.showers'),
        changeValue: this.state.showersFilter,
      },
      {
        id: 'educationFilter',
        label: t('filter.education'),
        changeValue: this.state.educationFilter,
      },
      {
        id: 'healthFilter',
        label: t('filter.health'),
        changeValue: this.state.healthFilter,
      },
      {
        id: 'hairCutsFilter',
        label: t('filter.hairCuts'),
        changeValue: this.state.hairCutsFilter,
      },
      {
        id: 'taxesFilter',
        label: t('filter.taxes'),
        changeValue: this.state.taxesFilter,
      },
      {
        id: 'faithFilter',
        label: t('filter.faith'),
        changeValue: this.state.faithFilter,
      },
    ];

    return (
      <Grid
        className={classes.root}
        container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
      >
        {filterConfig.map(result => {
          return (
            <FormControlLabel
              key={result.id}
              control={
                <Checkbox
                  checked={result.changeValue}
                  onChange={this.handleFilterChange(result.id)}
                  value={result.id}
                />
              }
              label={result.label}
            />
          );
        })}
      </Grid>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Filter);
