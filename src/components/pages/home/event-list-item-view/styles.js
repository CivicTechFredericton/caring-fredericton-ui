import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItemIcon: {
    flex: '0 0 100px',
    textAlign: 'center',
  },
}));

export default useStyles;
