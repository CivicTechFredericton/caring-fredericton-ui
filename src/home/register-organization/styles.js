import { createStyles } from '@material-ui/core';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: '100%',
  },
  mainGrid: {
    width: '100%',
  },
  mainGrid2: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  spacer: {
    paddingRight: 20,
    paddingLeft: 20,
    height: '60vh',
    borderRight: '3px solid ',
    borderRightColor: theme.palette.primary.dark,
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
  columnTitle: {
    marginTop: 3,
    color: theme.palette.primary.dark,
  },
  lastColumn: {
    height: '60vh',
    paddingLeft: 20,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}));

export default styles;
