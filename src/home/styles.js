import { createStyles } from '@material-ui/core';

const styles = createStyles((theme) => ({
  root: {
    padding: 30,
  },
  filter: {
    width: 200,
  },
  fab: {
    position: 'absolute',
    bottom: '50px',
    right: '50px',
  },
  image: {
    width: '25%',
    height: 'auto',
  },
  calender: {
    paddingLeft: 15,
  },
}));

export default styles;
