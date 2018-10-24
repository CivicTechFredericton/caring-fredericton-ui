import React from 'react';
import PropTypes from 'prop-types';
import spinStyles from 'spinkit/css/spinners/10-fading-circle.css';
import classNames from 'classnames';

const LoadingSpinner = ({ className }) => {
  return (<div className={ classNames(spinStyles["sk-fading-circle"], className) }>
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle1"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle2"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle3"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle4"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle5"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle6"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle7"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle8"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle9"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle10"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle11"]) } />
      <div className={ classNames(spinStyles["sk-circle"], spinStyles["sk-circle12"]) } />
    </div>);
};

LoadingSpinner.propTypes = {
  className: PropTypes.string
};

export default LoadingSpinner;
