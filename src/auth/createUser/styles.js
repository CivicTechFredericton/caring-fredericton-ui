import { createStyles } from '@material-ui/core';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: 350,
  },
  spacer: {
    paddingRight: 20,
  },
  button: {
    marginLeft: '40%',
    color: 'white',
    fontSize: '14px',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  error: {
    color: theme.palette.secondary.dark,
  },
}));

export default styles;
