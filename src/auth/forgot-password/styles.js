import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  submitButton: {
    marginTop: 25,
    color: 'white',
    fontSize: '16px',
  },
  typography: {
    textAlign: 'left',
  },
}));

export default useStyles;
