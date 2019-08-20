import React from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles';
import PropTypes from 'prop-types';
import { listRegisteredOrganizations } from '../../api/endpoints';
//import { conditionalExpression } from '@babel/types';

class FilterOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      value: '',
      organizations: [],
    };
    //this.handleChange = this.handleChange.bind(this);
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
      //console.log(options)
      organizations.push({ id: null, name: null });
      this.setState({ organizations });
    });
  };

  GetOrfanizationMenu = options => {
    {
      return options.map(option => {
        return (
          <MenuItem key={option.id} value={option.name}>
            {option.name || 'All'}
          </MenuItem>
        );
      });
    }
  };

  render() {
    const { classes } = this.props;
    /*const currencies = [
          {
            value: 'USD',
            label: '$',
          },
          {
            value: 'EUR',
            label: '€',
          },
          {
            value: 'BTC',
            label: '฿',
          },
          {
            value: 'JPY',
            label: '¥',
          },
        ];*/

    /*listRegisteredOrganizations().then(results => results.map(option => {
          }))*/

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='standard-select-currency'
          select
          label='Select'
          className={classes.textField}
          value={this.state.value} //'EUR'//{values.currency}
          //onChange={handleChange('currency')}
          onChange={this.handleChange}
          //onChange={() => {}}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText='Please select your organization'
          margin='normal'
        >
          {this.GetOrfanizationMenu(this.state.organizations)}
        </TextField>
      </form>
    );
  }
}

FilterOrganization.propTypes = {
  classes: PropTypes.any,
  updateFiltersOrganization: PropTypes.func,
  //t: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(FilterOrganization);
