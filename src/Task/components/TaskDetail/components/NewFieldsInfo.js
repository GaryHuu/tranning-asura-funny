import { Button, Form, Input, Row, Select } from 'antd';
import React from 'react';

function NewFieldsInfo({ onConfirm, onCancel }) {
  const { Option } = Select;
  const handleFinish = (value) => {
    onConfirm(value);
  };
  return (
    <Form onFinish={handleFinish}>
      <Row>
        <Form.Item rules={[{ required: true }]} name='label' label='Label'>
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          style={{ margin: '0 20px', width: '180px' }}
          name='type'
          label='Type'
        >
          <Select placeholder='Select Type'>
            <Option value='text'>Text</Option>
            <Option value='date'>Date</Option>
            <Option value='time from to'>Time From-to</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ margin: '0 20px 0 0' }}>
          <Button
            onClick={() => {
              onCancel();
            }}
            type='dashed'
            htmlType='button'
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='dashed' htmlType='submit'>
            Confirm
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

export default NewFieldsInfo;
