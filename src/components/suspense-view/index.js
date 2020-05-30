import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const suspenseContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const SuspenseView = () => {
  return (
    <div style={suspenseContainerStyle}>
      <CircularProgress color='primary' />
    </div>
  );
};

export default SuspenseView;
