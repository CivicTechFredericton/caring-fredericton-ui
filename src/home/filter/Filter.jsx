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
        label: t('filter.meals'),
      },
      {
        id: 'laundry',
        label: t('filter.laundry'),
      },
      {
        id: 'social',
        label: t('filter.social'),
      },
      {
        id: 'showers',
        label: t('filter.showers'),
      },
      {
        id: 'education',
        label: t('filter.education'),
      },
      {
        id: 'health',
        label: t('filter.health'),
      },
      {
        id: 'hairCuts',
        label: t('filter.hairCuts'),
      },
      {
        id: 'taxes',
        label: t('filter.taxes'),
      },
      {
        id: 'faith',
        label: t('filter.faith'),
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
