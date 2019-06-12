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
      categoriesFilterSet: [],
      categories: {
        meals: false,
        laundry: false,
        social: false,
        showers: false,
        education: false,
        health: false,
        hairCuts: false,
        taxes: false,
        faith: false,
      },
    };
  }

  // Handle category check box list events
  handleFilterChange = name => event => {
    let checked = event.target.checked;
    // let value = event.target.value;
    let categoriesFilterSet = this.state.categoriesFilterSet;
    let categories = this.state.categories;

    categories[name] = checked;

    categoriesFilterSet = Object.keys(categories).filter(result => {
      if (categories[result]) {
        return result.toString;
      }
    });

    this.setState({
      categories,
      categoriesFilterSet,
    });

    this.props.updateFilters({
      categoriesFilterSet,
    });
  };

  render() {
    const { classes, t } = this.props;
    const filterConfig = [
      {
        id: 'meals',
        label: t('filter.meals'),
        changeValue: this.state.categories.meals,
      },
      {
        id: 'laundry',
        label: t('filter.laundry'),
        changeValue: this.state.categories.laundry,
      },
      {
        id: 'social',
        label: t('filter.social'),
        changeValue: this.state.categories.social,
      },
      {
        id: 'showers',
        label: t('filter.showers'),
        changeValue: this.state.categories.showers,
      },
      {
        id: 'education',
        label: t('filter.education'),
        changeValue: this.state.categories.education,
      },
      {
        id: 'health',
        label: t('filter.health'),
        changeValue: this.state.categories.health,
      },
      {
        id: 'hairCuts',
        label: t('filter.hairCuts'),
        changeValue: this.state.categories.hairCuts,
      },
      {
        id: 'taxes',
        label: t('filter.taxes'),
        changeValue: this.state.categories.taxes,
      },
      {
        id: 'faith',
        label: t('filter.faith'),
        changeValue: this.state.categories.faith,
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
  updateFilters: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Filter);
