import React, { useState } from 'react';

import InputField from '../components/InputField';
import '../assets/styles.scss';
import ButtonConfirm from '../../ButtonConfirm';

function TextEdit(props) {
  const { value, onEdit, label, name, disabled } = props;
  const [inputValue, setInputValue] = useState(value);
  const [isChange, setIsChange] = useState(false);

  const handleConfirm = () => {
    setIsChange(false);
    if (!onEdit) return;

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

export default TextEdit;
