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
  longTextField: {
    width: 700,
  },
  timeField: {
    width: 150,
  },
  dateField: {
    width: 200,
  },
  occurrenceTextField: {
    width: 215,
  },
  dayOfWeekTextField: {
    width: 130,
  },
  weekOfMonthTextField: {
    width: 75,
  },
  checkBoxField: {
    width: 120,
  },
  dateFieldsSpacer: {
    paddingRight: 5,
  },
  spacer: {
    paddingRight: 20,
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
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default styles;
