import React from 'react';

//import { Formik, Form, Field } from 'formik';

//import { TextField } from 'formik-material-ui';

import PropTypes from 'prop-types';
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  createStyles,
  Button,
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

//import { confirmCode } from '../../api/cognito';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: 200,
  },
  spacer: {
    paddingRight: 20,
  },
  button: {
    marginLeft: '40%',
    marginTop: 30,
    color: 'white',
    fontSize: '14px',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 100,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}));

class EventDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: 'md',
    };
  }

  render() {
    //   const { t, classes, eventObj } = this.props;
    const { classes, eventObj } = this.props;

    let contactEmail = '';
    let description = '';
    let startDate = '';
    let startTime = '';
    let endDate = '';
    let endTime = '';
    let name = '';

    if (eventObj) {
      contactEmail = eventObj.contact_email;
      description = eventObj.description;
      startDate = eventObj.start_date;
      startTime = eventObj.start_time;
      endDate = eventObj.end_date;
      endTime = eventObj.end_time;
      name = eventObj.name;
    }

    return (
      <div className={classes.root}>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.show}
          aria-labelledby='form-dialog-title'
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Grid item className={classes.flex}>
                {//eventObj
                'Event: ' + name
                // t('authorize.lblConfirmCode')
                }
              </Grid>
              <IconButton
                color='inherit'
                onClick={this.props.handleClose}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='center'
            >
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='center'
              >
                <Grid className={classes.spacer} item>
                  <Typography>{'Event: ' + name}</Typography>
                  <Typography>
                    {'Start Date: ' + startDate + ' ' + startTime}
                  </Typography>
                  <Typography>
                    {'End Date: ' + endDate + ' ' + endTime}
                  </Typography>
                  <Typography>{'Description: ' + description}</Typography>
                  <Typography>{'Contact: ' + contactEmail}</Typography>
                </Grid>
              </Grid>
              <Button
                className={this.props.classes.button}
                variant='contained'
                color='secondary'
                type='submit'
              >
                {
                  'Cancel'
                  // t('authorize.btnConfirmCode')
                }
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

EventDialog.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  eventObj: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(EventDialog);
