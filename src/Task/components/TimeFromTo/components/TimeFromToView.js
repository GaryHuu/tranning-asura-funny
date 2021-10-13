import { MinusCircleOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, TimePicker } from 'antd';
import React from 'react';

function TimeFromToView(props) {
  const { label, name, disabled, onRemove } = props;
  return (
    <>
      <Form.Item name={name} label={label}>
        <TimePicker.RangePicker disabled={disabled} />
      </Form.Item>
      {disabled || (
        <Button onClick={() => onRemove()}>
          <MinusCircleOutlined />
          Remove
        </Button>
      )}
    </>
  );
}

export default TimeFromToView;
