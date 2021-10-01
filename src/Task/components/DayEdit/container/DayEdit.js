import React, { useState } from 'react';
import ButtonConfirm from '../../ButtonConfirm';
import DayPicker from '../components/DayPicker';
import '../assets/styles.scss';

function DayEdit(props) {
  const { name, day, label, onEdit, disabled } = props;
  const [isChange, setIsChange] = useState(false);
  const [dayInput, setDayInput] = useState(day);

  const handleConfirm = () => {
    setIsChange(false);
    if (!onEdit) return;

    console.log(dayInput);

    if (name) {
      onEdit({
        [name]: dayInput,
      });
      return;
    }

    onEdit(dayInput);
  };

  const handleDayChange = (value) => {
    setDayInput(value);
    setIsChange(true);
  };

  return (
    <div className='wrap'>
      {label && <label>{label}:</label>}
      <DayPicker
        disabled={disabled}
        day={dayInput}
        onChange={handleDayChange}
      />
      {isChange && <ButtonConfirm onClick={handleConfirm} />}
    </div>
  );
}

export default DayEdit;
