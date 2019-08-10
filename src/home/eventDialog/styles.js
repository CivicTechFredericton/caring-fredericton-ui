import { createStyles } from '@material-ui/core';

const styles = createStyles(theme => ({
  root: {
    paddingTop: 25,
  },
  spacer: {
    paddingRight: 20,
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

export default styles;
