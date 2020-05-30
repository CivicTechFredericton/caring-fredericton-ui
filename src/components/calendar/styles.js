import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  newEventButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing(1),
    padding: 24,
  },
  addIcon: {
    fontSize: '2em',
  },
  eventButton: {
    marginTop: 25,
    color: 'white',
    fontSize: '14px',
  },
  filterButton: {
    textTransform: 'none',
  },
  /*customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "blue" }
  }*/
}));

export default useStyles;
