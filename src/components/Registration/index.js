import Registration from './Registration';
import hocs from 'common/common-hocs';
import validate from './validate';
import { selectFormValues } from './selectors';
import { FORM_NAME } from './constants';

const form = {
  form: FORM_NAME,
  validate
};

const mapState = state => ({
  formValues: selectFormValues(state)
});


// export default hocs({ form: "registration", i18n: 'header', router: true, redux: { mapState, mapDispatch } })(Registration);
export default hocs({ form, i18n: 'register', router: false, redux: { mapState } })(Registration);