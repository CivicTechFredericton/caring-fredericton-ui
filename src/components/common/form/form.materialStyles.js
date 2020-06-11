import variables from '../../../styles/variables.scss';
import { isMobile } from 'react-device-detect';

const input = (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(),
});

export const inputThemeLight = (theme) => ({
  ...input(theme),
  color: theme.palette.secondary.main,
});

export const inputThemeLightRoot = (theme) => ({
  color: theme.palette.secondary.main,
});

export const inputThemeLightDisabled = (theme) => ({
  color: theme.palette.secondary.light,
});

export const inputThemeLightUnderline = (theme) => ({
  '&:after': {
    borderBottom: `2px solid ${theme.palette.secondary.light}`,
  },
  '&:before': {
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
  },
  '&&&&:hover:before': {
    borderBottom: `2px solid ${theme.palette.secondary.light}`,
  },
});

export const inputLabelThemeLightRoot = (theme) => ({
  color: theme.palette.secondary.main,
});

export const inputLabelThemeLightDisabled = (theme) => ({
  color: theme.palette.secondary.light,
});

const numberInput = (theme) => ({
  paddingTop: theme.spacing(),
  maxWidth: 100,
  marginLeft: theme.spacing(),
});

const formInputLabel = (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
});

const formInputLabelThemeLight = (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  color: theme.palette.secondary.main,
  '&$formLabelThemeLightFocused': {
    color: theme.palette.secondary.main,
  },
});

export default (theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: variables.sizeXl,
    paddingRight: variables.sizeXl,
    paddingTop: variables.sizeLg,
    paddingBottom: variables.sizeLg,
    [theme.breakpoints.up('sm')]: {
      width: theme.breakpoints.values.sm,
    },
  },
  formFieldsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formInputLabel: formInputLabel(theme),
  formInputLabelMarginRight: {
    ...formInputLabel(theme),
    marginRight: 26,
  },
  formInputLabelThemeLight: formInputLabelThemeLight(theme),
  formInputLabelThemeLightMarginRight: {
    ...formInputLabelThemeLight(theme),
    marginRight: 26,
  },
  formLabelThemeLightFocused: {
    // Just required to access the rule above
  },
  inputLabelThemeLightRoot: inputLabelThemeLightRoot(theme),
  inputLabelThemeLightDisabled: inputLabelThemeLightDisabled(theme),
  formControl: {
    marginBottom: theme.spacing(),
  },
  formHelperText: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  input: input(theme),
  inputThemeLight: inputThemeLight(theme),
  inputThemeLightRoot: inputThemeLightRoot(theme),
  inputThemeLightDisabled: inputThemeLightDisabled(theme),
  inputThemeLightUnderline: inputThemeLightUnderline(theme),
  selectIcon: {
    color: theme.palette.text.secondary,
    marginRight: '12px',
  },
  option: {
    color: 'rgba(0, 0, 0, 87)',
  },
  textFieldIcon: {
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    color: theme.palette.secondary['200'],
  },
  formControlCheckboxLabel: {
    color: theme.palette.text.secondary,
  },
  formComponentVerticalSpace: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  formTitleVerticalSpace: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  formComponentContainer: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    display: 'flex',
    justifyContent: 'center',
  },
  formAppLogo: {
    width: 120,
    height: 120,
    marginTop: 24,
  },
  formLogoText: {
    fontWeight: isMobile ? 'normal' : 'lighter',
    marginBottom: 32,
  },
  formLabelLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formLabelLinkMarginUp: {
    textAlign: 'center',
    minHeight: 48,
    marginBottom: theme.spacing(2),
  },
  formLabelMarginRight: {
    marginRight: 12,
  },
  formDivider: {
    width: '100%',
  },
  horizontalCenterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberInput: {
    ...input(theme),
    ...numberInput(theme),
  },
  numberInputThemeLight: {
    ...input(theme),
    ...numberInput(theme),
    color: theme.palette.secondary.light,
  },
  numberBtn: {
    padding: theme.spacing(),
    width: theme.spacing(3),
    height: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.light,
  },
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});
