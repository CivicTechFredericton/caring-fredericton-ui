import SetPasswordPage from './setPasswordPage';
import { compose } from '../../utils/func';
import { withStyles } from '@material-ui/core';
import formMaterialStyles from '../../components/common/form/form.materialStyles';

export default compose(withStyles(formMaterialStyles))(SetPasswordPage);
