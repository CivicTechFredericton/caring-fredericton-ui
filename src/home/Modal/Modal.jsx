import React from 'react';
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
import { isValidUser } from '../../api/cognito';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  spacer: {
    paddingRight: 20,
  },
  button: {
    marginTop: 30,
    color: 'white',
    fontSize: '14px',
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

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: 'sm',
    };
  }

  render() {
    const { classes, t, eventObj } = this.props;

    var title = '';
    var orgName = '';
    var startDate = '';
    var eventName = '';
    var location = '';
    var startTime = '';
    var endTime = '';
    var description = '';
    var contactEmail = '';
    var contactPhone = '';

    if (eventObj) {
      title = eventObj.name; //title
      startDate = eventObj.start_date; //event date / start date
      orgName = eventObj.owner_name;
      eventName = eventObj.name; //event name
      location = eventObj.location; //event location

      startTime = eventObj.start_time; //event start time 24h format
      endTime = eventObj.end_time; //event end time 24h format
      description = eventObj.description; //event description
      contactEmail = eventObj.contact_email; //event contact's email
      contactPhone = eventObj.contact_phone; //event contact's / org phone number
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
                {title}
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
                  <Typography>{'Event: ' + eventName}</Typography>
                  <Typography>{'Event Date: ' + startDate}</Typography>
                  <Typography>{'Host Organization: ' + orgName}</Typography>
                  <Typography>{'Event Location: ' + location}</Typography>
                  <Typography>{'Starts At: ' + startTime}</Typography>
                  <Typography>{'Ends At: ' + endTime}</Typography>
                  {/* Original start end time fields were to difficult to read
                   reduced it to an event date at the top and start and end times.
                   Part of the problem was YYYY-MM-DD format in conjunction with
                   24h time format*/}
                  <Typography>{'Description: ' + description}</Typography>
                  <Typography>{'Contact Email: ' + contactEmail}</Typography>
                  <Typography>
                    {/* Added this, not functional, might be a useful feature to have,
                    email not always the best communication option*/}
                    {'Host Org Phone: ' + contactPhone}
                  </Typography>

                  <Typography>
                    {/* This is a place holder for a "possible" new feature*/}
                    {'Recurrence: ' + 'Yes OR NO ex Yes every First Tuesday'}
                  </Typography>
                </Grid>
              </Grid>
              {isValidUser() && (
                <Grid item>
                  <Button
                    className={this.props.classes.button}
                    variant='contained'
                    color='secondary'
                    type='submit'
                  >
                    {t('eventDetails.btnCancelEvent')}
                  </Button>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Modal.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  eventObj: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Modal);
