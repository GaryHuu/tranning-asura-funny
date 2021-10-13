import { Form, TimePicker } from 'antd';
import React from 'react';

function TimeFromToView(props) {
  const { label, name, disabled } = props;
  return (
    <>
      <Form.Item name={name} label={label}>
        <TimePicker.RangePicker disabled={disabled} />
      </Form.Item>
    </>
  );
}

export default TimeFromToView;
