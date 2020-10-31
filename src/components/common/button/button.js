import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  children: PropTypes.string,
  variant: PropTypes.object,
};

export default Button;
