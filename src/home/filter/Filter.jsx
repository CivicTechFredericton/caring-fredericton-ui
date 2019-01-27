import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
  createStyles,
  // Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const styles = () =>
  createStyles({
    root: {
      paddingTop: 35,
    },
  });

class Filter extends React.Component {
  render() {
    const { classes } = this.props;
    const filterConfig = [
      {
        id: 'one',
        label: 'one',
      },
      {
        id: 'two',
        label: 'two',
      },
      {
        id: 'three',
        label: 'three',
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
            <Checkbox
              key={result.id}
              checked={true}
              onChange={() => {}}
              value={result.id}
            />
          );
        })}
      </Grid>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Filter);
