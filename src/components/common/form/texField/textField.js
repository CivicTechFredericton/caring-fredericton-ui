import React from 'react';
import PropTypes from 'prop-types';

import styles from './textField.module.scss';
import classNames from 'classnames';

const TextField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div
      className={classNames(styles.textField, {
        [styles.error]: touched[field.name] && errors[field.name],
      })}
    >
      <input {...field} type={props.type} />
      <span className={styles.bar} />
      <label>{props.placeholder}</label>
      <div className={styles.error}>
        {touched[field.name] && errors[field.name] ? errors[field.name] : ''}
      </div>
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.node,
  placeholder: PropTypes.node,
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
  }),
};

export default TextField;
