import React from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles';
import PropTypes from 'prop-types';
import { listRegisteredOrganizations } from '../../api/endpoints';

class FilterOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      value: '',
      organizations: [],
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.updateFiltersOrganization({
        organizationValue: event.target.value,
      });
    });
  };

  componentDidMount() {
    this.GetOrganizationsList();
  }

  GetOrganizationsList = () => {
    listRegisteredOrganizations().then(organizations => {
      organizations.push({ id: null, name: null });
      this.setState({ organizations });
    });
  };

  GetOrganizationMenu = options => {
    return options.map(option => {
      return (
        <MenuItem key={option.id} value={option.name}>
          {option.name || 'All'}
        </MenuItem>
      );
    });
  };

  render() {
    const { classes, t } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='standard-select-currency'
          select
          label={t('filters.lblSelect')}
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText={t('filters.orgHelperText')}
          margin='normal'
        >
          {this.GetOrganizationMenu(this.state.organizations)}
        </TextField>
      </form>
    );
  }
}

FilterOrganization.propTypes = {
  classes: PropTypes.any,
  updateFiltersOrganization: PropTypes.func,
  t: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(FilterOrganization);
