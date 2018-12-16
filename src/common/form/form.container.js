import hocs from 'common/common-hocs';
import { selectFormValues } from './selectors';
import Form from './form.presentation';

const mapState = (state, props) => ({
  formValues: selectFormValues(state, props),
});

export default hocs({
  form: {},
  i18n: ['common', 'errors'],
  redux: { mapState },
})(Form);
