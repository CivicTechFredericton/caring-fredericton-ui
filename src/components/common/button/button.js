import React from 'react';
import { button, buttonLink } from './button.module.scss';
import classNames from 'classnames';

const Button = (props) => {
  const { variant } = props;
  return (
    <button
      {...props}
      className={classNames(button, { [buttonLink]: variant === 'link' })}
    >
      {props.children}
    </button>
  );
};

export default Button;
