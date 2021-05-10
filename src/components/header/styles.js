import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    padding: '0.5em 1.5em',
    boxShadow: '0 0 0.5em rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  space: {
    width: '10px',
    height: '10px',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;
