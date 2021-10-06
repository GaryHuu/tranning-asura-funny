import { PropTypes } from 'prop-types';
import React from 'react';

import TextEditForm from '../components/TextEditForm';

TextEdit.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
};

function TextEdit(props) {
  const { label, name, disabled, onRemove } = props;

  return (
    <TextEditForm
      onRemove={onRemove}
      label={label}
      name={name}
      disabled={disabled}
    />
  );
}
export default TextEdit;
