import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 25,
  },
  spacer: {
    paddingRight: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  field: {
    paddingBottom: 5,
  },
  textField: {
    width: 350,
  },
  longTextField: {
    width: 700,
  },
  timeField: {
    width: 125,
  },
  dateField: {
    width: 175,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkBoxField: {
    width: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 100,
  },
  occurrenceTextField: {
    width: 150,
  },
  dayOfWeekTextField: {
    width: 130,
  },
  weekOfMonthTextField: {
    width: 75,
  },
  error: {
    color: theme.palette.secondary.dark,
  },
}));

export default useStyles;
