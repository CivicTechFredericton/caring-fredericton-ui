import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 25,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  textField: {
    width: '100%',
  },
  postalCodeField: {
    width: 125,
  },
}));

export default useStyles;
