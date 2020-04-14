import { createMuiTheme } from '@material-ui/core/styles';

const materialAppTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#039be5',
      dark: '#006db3',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffb04c',
      main: '#f57f17',
      dark: '#bc5100',
      contrastText: '#000000',
    },
    typography: {
      useNextVariants: true,
    },
    text: {
      primary: '#0175ad',
      secondary: '#039be5',
      disabled: '#000000',
      hint: '#000000',
    },
  },
});

export default materialAppTheme;
