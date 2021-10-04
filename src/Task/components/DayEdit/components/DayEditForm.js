import { DatePicker, Form } from 'antd';
import React from 'react';

function DayEditForm(props) {
  const { label, name, disabled } = props;

  return (
    <Form.Item name={name} label={label}>
      <DatePicker disabled={disabled} />
    </Form.Item>
  );
}

export default DayEditForm;
