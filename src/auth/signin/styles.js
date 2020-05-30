import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: 25,
    color: 'white',
    fontSize: '16px',
  },
  textField: {
    width: '100%',
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
}));

export default useStyles;
