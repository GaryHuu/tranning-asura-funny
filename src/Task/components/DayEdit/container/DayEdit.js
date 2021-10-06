import { PropTypes } from 'prop-types';
import React from 'react';

import DayEditForm from '../components/DayEditForm';

DayEdit.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
};

function DayEdit(props) {
  const { label, name, disabled, onRemove } = props;

  return (
    <DayEditForm
      onRemove={onRemove}
      label={label}
      name={name}
      disabled={disabled}
    />
  );
}

export default DayEdit;
