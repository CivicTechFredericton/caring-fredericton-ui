import React from 'react';
import PropTypes from 'prop-types';
import Form from 'common/form';
import FormField from 'common/form-field';
import { Field } from 'redux-form/immutable';
import hocs from 'common/common-hocs';
import { uploadExample } from 'examples/reddit-api-redux/actions';

const initialValues = {
  type: 'base64',
};

const UploadDemo = ({ t }) => {
  return (
    <Form
      onSubmit={uploadExample}
      form={'upload-demo'}
      submitLabel={t('submit')}
      initialValues={initialValues}
    >
      <Field
        component={FormField}
        name='image'
        type='file'
        label={t('upload_file')}
      />
      <Field
        component={FormField}
        name='name'
        type='text'
        label={t('file_name')}
      />
    </Form>
  );
};

UploadDemo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default hocs({ i18n: 'examples' })(UploadDemo);
