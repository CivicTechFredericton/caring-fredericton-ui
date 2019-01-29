import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  createStyles,
  // Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
  });

class Filter extends React.Component {
  render() {
    const { classes, t } = this.props;
    const filterConfig = [
      {
        id: 'meals',
        label: t('meals', 'Meals'),
      },
      {
        id: 'laundry',
        label: t('laundry', 'Laundry'),
      },
      {
        id: 'social',
        label: t('social', 'Social'),
      },
      {
        id: 'showers',
        label: t('showers', 'Showers'),
      },
      {
        id: 'education',
        label: t('education', 'Education'),
      },
      {
        id: 'health',
        label: t('health', 'Health'),
      },
      {
        id: 'hairCuts',
        label: t('hairCuts', 'Hair Cuts'),
      },
      {
        id: 'taxes',
        label: t('taxes', 'Taxes'),
      },
      {
        id: 'faith',
        label: t('faith', 'Faith'),
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
                  checked={true}
                  onChange={() => {}}
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

export default withStyles(styles)(Filter);
