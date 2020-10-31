import React from 'react';
import PropTypes from 'prop-types';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

/**
 * Customize the dialog title
 */
const DialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default DialogTitle;
