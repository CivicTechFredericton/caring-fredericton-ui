import { Button, withStyles } from '@material-ui/core';

export const RegisterButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
  },
})(Button);
