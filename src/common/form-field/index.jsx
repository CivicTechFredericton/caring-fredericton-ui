import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import hocs from 'common/common-hocs';

const UploadField = ({ onChange = e => e }) => {
  const finalOnChange = e => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      onChange(reader.result.split(',')[1]);
    };

    reader.onerror = error => {
      // @TODO Replace with a nice error message?
      alert('Failed to upload file :(', error)
    };

  };

  return (<input type='file' onChange={ finalOnChange } />)
};

UploadField.propTypes = {
  onChange: PropTypes.func
};

const FormField = (props) => {
  const { label, input, type, meta: { error, warning, touched }, t } = props;

  return (
    <div className={ styles.formField }>
      {
        label ?
          (<label>{ label }</label>) :
          null
      }
      {
        type === 'file' ?
          <UploadField { ...input } /> :
          <input {...input} type={ type } />
      }
      {
        touched && error ?
          (<span className={ styles.error }>{ t(error) }</span>) :
          null
      }
      {
        touched && warning ?
          (<span className={ styles.warning }>{ t(warning) }</span>) :
          null
      }
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.any,
  type: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.node,
    warning: PropTypes.node
  }),
  t: PropTypes.func.isRequired
};

export default hocs({ i18n: [] })(FormField);
