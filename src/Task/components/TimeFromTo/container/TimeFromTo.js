import React from 'react';

import TimeFromToView from '../components/TimeFromToView';

function TimeFromTo(props) {
  const { disabled, name, label } = props;
  return <TimeFromToView disabled={disabled} name={name} label={label} />;
}

export default TimeFromTo;
