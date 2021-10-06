import React from 'react';

import TimeFromToView from '../components/TimeFromToView';

function TimeFromTo(props) {
  const { disabled, name, label, onRemove } = props;
  return (
    <TimeFromToView
      onRemove={onRemove}
      disabled={disabled}
      name={name}
      label={label}
    />
  );
}

export default TimeFromTo;
