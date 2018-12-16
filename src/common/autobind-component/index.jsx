import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'class-autobind';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
/*
  Simple helper component which will autobind all functions on a component
  This is necessary becasue the reference to "this" can be lost in React components
  when you are performing callbacks from child functions.

  Additionally, this component also wraps itself in a higher-order component (HoC)
  to ensure re-renders are only performed as needed. Even though, by default,
  React will prevent rerenders if no data has changed, two objects are never equal
  unless they are references to the same objects, not just the same value.

  The react-immutable-render-mixin updates the showComponentUpdate function
  on all components (that extend this) to use the ImmutableJS built in
  comparison functions to ensure that even complex objects, so long as they are
  Immutable, will be compared on VALUE not on REFERENCES
*/
class AutobindComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldUpdate = shouldComponentUpdate;
    autobind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // additional logic to properly re-render components if the location
    // is updated. This handles certain cases where should update isn't correct
    const { location } = this.props;

    const locationChanged =
      location && location.pathname !== nextProps.location.pathname;

    return locationChanged || this.shouldUpdate(nextProps, nextState);
  }
}

// we are default the translation function
// so we don't have to define it in tests
AutobindComponent.defaultProps = {
  t: e => e,
};

AutobindComponent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default AutobindComponent;
