import React from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  withStyles,
  Button,
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

import { isValidUser } from '../../api/cognito';
import { getUserDetails } from '../../utils/localStorage';
import { cancelEvent } from '../../api/endpoints';
import { getSession } from '../../api/cognito';

import styles from './styles';

class EventDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openCancel: false,
      fullWidth: true,
      maxWidth: 'sm',
    };
  }

  openConfirmModel = () => {
    this.setState({ openCancel: true });
  };

  closeConfirmModel = () => {
    this.setState({ openCancel: false });
  };

  handleConfirmYes = (orgId, eventId) => {
    getSession(token => {
      cancelEvent(token.idToken, orgId, eventId).then(() => {
        this.props.handleClose();
      });
    });
  };

  render() {
    const { classes, t, eventObj } = this.props;

    let showCancelButton = false;
    let showEditButton = false;

    let eventId = '';
    let orgId = '';
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
      // See if the user belongs to the organzation
      orgId = eventObj.owner;
      if (isValidUser()) {
        let userDetails = getUserDetails();
        if (orgId === userDetails.organization_id) {
          showCancelButton = true;
        }
      }

      let eventStartDate = moment(
        eventObj.start_date + ' ' + eventObj.start_time
      )
        .utc('YYYY-MM-DD HH:mm:ss')
        .local();

      let eventEndDate = moment(eventObj.end_date + ' ' + eventObj.end_time)
        .utc('YYYY-MM-DD HH:mm:ss')
        .local();

      eventId = eventObj.id;
      name = eventObj.name;
      orgName = eventObj.owner_name;
      location = eventObj.location;
      contactEmail = eventObj.contact_email;
      description = eventObj.description;
      startDate = eventStartDate.format('YYYY-MM-DD');
      startTime = eventStartDate.format('hh:mm A');
      endDate = eventEndDate.format('YYYY-MM-DD');
      endTime = eventEndDate.format('hh:mm A');
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
              <Grid item className={classes.flex}></Grid>
              {showEditButton && (
                <Tooltip title={t('eventDetails.btnEditEvent')}>
                  <Button variant='text' color='inherit' disabled>
                    <EditIcon />
                  </Button>
                </Tooltip>
              )}
              {showCancelButton && (
                <Grid item>
                  <Tooltip title={t('eventDetails.btnCancelEvent')}>
                    <Button
                      variant='text'
                      color='inherit'
                      onClick={this.openConfirmModel}
                      aria-label='Delete'
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                  <Dialog
                    open={this.state.openCancel}
                    onClose={this.closeConfirmModel}
                    aria-labelledby='form-dialog-title'
                  >
                    <DialogTitle>
                      {t('eventDetails.lblConfirmCancel')}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {t('eventDetails.lblCancelMessage')}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleConfirmYes.bind(
                          this,
                          orgId,
                          eventId
                        )}
                      >
                        {t('common.btnYes')}
                      </Button>
                      <Button onClick={this.closeConfirmModel} autoFocus>
                        {t('common.btnNo')}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              )}
              <Tooltip title={t('common.btnClose')}>
                <IconButton
                  color='inherit'
                  onClick={this.props.handleClose}
                  aria-label='Close'
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid item align='center'>
              <Typography variant='h6'>{name}</Typography>
            </Grid>
            <Grid
              container
              direction='row'
              justify='center'
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
                  {t('eventDetails.lblStartDate') + startDate}
                </Typography>
                <Typography>
                  {t('eventDetails.lblStartTime') + startTime}
                </Typography>
                <Typography>
                  {t('eventDetails.lblEndTime') + endTime}
                </Typography>
                <Typography>
                  {t('eventDetails.lblEndDate') + endDate}
                </Typography>
                <Typography>
                  {t('eventDetails.lblDescription') + description}
                </Typography>
                <Typography>
                  {t('eventDetails.lblContact') + contactEmail}
                </Typography>
              </Grid>
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
