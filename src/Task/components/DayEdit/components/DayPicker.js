import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';

function DayPicker(props) {
  const { day, onChange, disabled } = props;
  const handleOnChange = (date, dateString) => {
    if (!onChange) return;
    onChange(dateString);
  };
  return (
    <DatePicker
      disabled={disabled}
      onChange={handleOnChange}
      defaultValue={moment(day, 'DD/MM/YYYY')}
      format='DD/MM/YYYY'
    />
  );
}

export default DayPicker;
