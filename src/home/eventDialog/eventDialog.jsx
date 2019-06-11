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

class EventDialog extends React.Component {
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

    let orgName = '';
    let location = '';
    let contactEmail = '';
    let description = '';
    let startDate = '';
    let startTime = '';
    let endDate = '';
    let endTime = '';
    let name = '';

    if (eventObj) {
      name = eventObj.name;
      orgName = eventObj.owner_name;
      location = eventObj.location;
      contactEmail = eventObj.contact_email;
      description = eventObj.description;
      startDate = eventObj.start_date;
      startTime = eventObj.start_time;
      endDate = eventObj.end_date;
      endTime = eventObj.end_time;
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
                {name}
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
                  <Typography>
                    {t('eventDetails.lblOrganization') + orgName}
                  </Typography>
                  <Typography>
                    {t('eventDetails.lblLocation') + location}
                  </Typography>
                  <Typography>
                    {t('eventDetails.lblStartDate') +
                      startDate +
                      ' ' +
                      startTime}
                  </Typography>
                  <Typography>
                    {t('eventDetails.lblEndDate') + endDate + ' ' + endTime}
                  </Typography>
                  <Typography>
                    {t('eventDetails.lblDescription') + description}
                  </Typography>
                  <Typography>
                    {t('eventDetails.lblContact') + contactEmail}
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

EventDialog.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  eventObj: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(EventDialog);