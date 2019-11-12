import { createStyles } from '@material-ui/core';

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
  error: {
    color: theme.palette.secondary.dark,
  },
  formLabelLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formLabelMarginRight: {
    marginRight: 12,
  },
}));

export default styles;
