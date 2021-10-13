import { MinusCircleOutlined } from '@ant-design/icons/lib/icons';
import { Button, DatePicker, Form } from 'antd';
import React from 'react';

function DayEditForm(props) {
  const { label, name, disabled, onRemove } = props;

  return (
    <>
      <Form.Item name={name} label={label}>
        <DatePicker format='DD/MM/YYYY' disabled={disabled} />
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

export default DayEditForm;
