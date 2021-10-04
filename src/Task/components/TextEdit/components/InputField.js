import { Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

InputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
function InputField(props) {
  const { value, onChange, disabled } = props;
  const [inputValue, setInputValue] = useState(value);
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    console.log(newValue);
  };
  return (
    <Input disabled={disabled} onChange={handleOnChange} value={inputValue} />
  );
}

InputField.defaultProps = {
  onChange: () => {},
};

export default InputField;
