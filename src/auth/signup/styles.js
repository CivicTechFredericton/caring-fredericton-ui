import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
  },
  codeTextField: {
    width: '50%',
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  submitButton: {
    marginTop: 25,
    color: 'white',
    fontSize: '16px',
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
