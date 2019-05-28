import { createStyles } from '@material-ui/core';

const styles = createStyles(theme => ({
  button: {
    marginTop: 25,
    color: 'white',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingRight: '30px',
    paddingLeft: '30px',
    fontSize: '18px',
  },
  loginDiv: {
    /*  border: 'solid',
    borderRadius: '20px',
    borderWidth: '7px',
    padding: '2%',
    borderColor: theme.palette.primary.main,*/
    width: '35%',
  },
  textField: {
    width: '100%',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  maingrid: {
    height: '90vh',
  },
  error: {
    color: theme.palette.secondary.dark,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

export default styles;
