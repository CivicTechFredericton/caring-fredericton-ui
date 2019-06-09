import { createStyles } from '@material-ui/core';

const styles = createStyles(theme => ({
  button: {
    marginTop: 25,
    color: 'white',
    fontSize: '18px',
  },
  loginDiv: {
    width: '35%',
  },
  textField: {
    width: '100%',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  maingrid: {
    height: '90vh',
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

export default styles;
