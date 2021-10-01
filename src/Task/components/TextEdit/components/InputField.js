import { Input } from 'antd';
import React from 'react';
import { useState } from 'react';

function InputField(props) {
  const { value, onChange, disabled } = props;
  const [inputValue, setInputValue] = useState(value);
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!onChange) return;
    onChange(newValue);
    console.log(newValue);
  };
  return (
    <Input disabled={disabled} onChange={handleOnChange} value={inputValue} />
  );
}

export default InputField;
