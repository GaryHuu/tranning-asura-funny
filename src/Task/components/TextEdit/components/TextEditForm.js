import { MinusCircleOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

function TextEditForm(props) {
  const { label, name, disabled } = props;

  return (
    <>
      <Form.Item name={name} label={label}>
        <Input disabled={disabled} />
      </Form.Item>
    </>
  );
}
export default TextEditForm;
