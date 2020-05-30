import React from 'react';
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

export default TextField;
