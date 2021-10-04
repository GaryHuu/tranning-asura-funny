import { PropTypes } from 'prop-types';
import React, { useState } from 'react';

import ButtonConfirm from 'Task/components/ButtonConfirm';

import InputField from '../components/InputField';

import '../assets/styles.scss';

TextEdit.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
};

function TextEdit(props) {
  const { value, onEdit, label, name, disabled } = props;
  const [inputValue, setInputValue] = useState(value);
  const [isChange, setIsChange] = useState(false);

  const handleConfirm = () => {
    setIsChange(false);

    if (name) {
      onEdit({
        [name]: inputValue,
      });
      return;
    }

    onEdit(inputValue);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setIsChange(true);
  };

  return (
    <div className='wrap'>
      {label && <label>{label}:</label>}
      <InputField
        disabled={disabled}
        onChange={handleInputChange}
        value={inputValue}
      />
      {isChange && <ButtonConfirm onClick={handleConfirm} />}
    </div>
  );
}

TextEdit.defaultProps = {
  onChange: () => {},
};

export default TextEdit;
