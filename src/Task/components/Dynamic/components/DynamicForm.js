import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd';
import { camelCase } from 'lodash';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { withDynamic } from '../container/DynamicContainer';
function DynamicForm() {
  const [disabled, setDisabled] = useState(true);
  const [inputFields, setInputField] = useState([]);
  const [actionType, setActionType] = useState();
  const [isOpen, setIsOpen] = useState();
  const [key, setKey] = useState();
  const { Option } = Select;

  useEffect(() => {
    if (isOpen === true) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isOpen]);

  // Handle remove field
  const handleRemoveField = (id) => {
    const values = [...inputFields];
    const index = values.findIndex((item) => item.key === id);
    if (index !== -1) {
      values.splice(index, 1);
    }
    setInputField(values);
  };

  // Handle add field
  const handleAddNewField = (field) => {
    const newInputFields = [...inputFields];
    const newField = {
      key: uuid(),
      name: camelCase(field.label),
      label: field.label,
      type: field.type,
    };
    newInputFields.push(newField);
    setInputField(newInputFields);
  };
  // Handle add field at head
  const handleAddFieldHead = (field) => {
    const newInputFields = [...inputFields];
    const newField = {
      key: uuid(),
      name: camelCase(field.label),
      label: field.label,
      type: field.type,
    };
    newInputFields.unshift(newField);
    setInputField(newInputFields);
  };

  // Handle add current field
  const handleAddCurrentField = (field) => {
    const newInputField = [...inputFields];
    const newField = {
      key: uuid(),
      name: camelCase(field.label),
      label: field.label,
      type: field.type,
    };
    const index = newInputField.findIndex((item) => item.key === key);
    if (index >= 0) {
      newInputField.splice(index + 1, 0, newField);
    }
    setInputField(newInputField);
  };

  // Handle confirm
  const handleConfirmField = (value) => {
    if (actionType === 'addField') {
      handleAddNewField(value);
    }
    if (actionType === 'addFieldAtHead') {
      handleAddFieldHead(value);
    }
    if (actionType === 'addCurrentField') {
      handleAddCurrentField(value);
    }
    setIsOpen(false);
  };

  // Handle action type
  const handleAction = (action) => {
    setIsOpen(true);
    setActionType(action);
  };
  const handleActionKey = (action, key) => {
    setActionType(action);
    setKey(key);
    setIsOpen(true);
  };
  // Handle close
  const handleClose = () => {
    setIsOpen(false);
  };
  // render field
  const renderField = () => {
    // eslint-disable-next-line array-callback-return
    return inputFields.map((field) => {
      switch (field.type) {
        case 'text':
          return (
            <Row key={field.key} style={{ flexWrap: 'nowrap' }}>
              <Form.Item name={field.name} label={field.label}>
                <Input placeholder={`Enter ${field.label}`} />
              </Form.Item>
              <Button onClick={() => handleRemoveField(field.key)}>
                <MinusCircleOutlined />
              </Button>
              <Button
                onClick={() => handleActionKey('addCurrentField', field.key)}
              >
                <PlusCircleOutlined />
              </Button>
            </Row>
          );
        case 'date':
          return (
            <Row key={field.key} style={{ flexWrap: 'nowrap' }}>
              <Form.Item name={field.label} label={field.label}>
                <DatePicker />
              </Form.Item>
              <Button onClick={() => handleRemoveField(field.key)}>
                <MinusCircleOutlined />
              </Button>
              <Button
                onClick={() => handleActionKey('addCurrentField', field.key)}
              >
                <PlusCircleOutlined />
              </Button>
            </Row>
          );
        case 'time':
          return (
            <Row key={field.key} style={{ flexWrap: 'nowrap' }}>
              <Form.Item name={field.label} label={field.label}>
                <TimePicker />
              </Form.Item>
              <Button onClick={() => handleRemoveField(field.key)}>
                <MinusCircleOutlined />
              </Button>
              <Button
                onClick={() => handleActionKey('addCurrentField', field.key)}
              >
                <PlusCircleOutlined />
              </Button>
            </Row>
          );
        default:
          break;
      }
    });
  };
  // Handle submit form
  const handleSubmitForm = (value) => {
    console.log(value);
  };

  return (
    <div
      className='container'
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: '20px 0' }}>Dynamic Form</h1>
      {inputFields.length > 0 ? (
        <Form
          name='dynamic_form_nest_item'
          autoComplete='off'
          onFinish={handleSubmitForm}
        >
          {renderField()}
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={isOpen}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : null}
      {isOpen === true ? (
        <Form
          name='dynamic_form_nest_item'
          autoComplete='off'
          onFinish={handleConfirmField}
        >
          <Row>
            <Form.Item name='label' label='Enter Label'>
              <Input />
            </Form.Item>
            <Form.Item name='type' label='Type' style={{ marginLeft: '10px' }}>
              <Select placeholder='Select Type'>
                <Option value='text'>Text</Option>
                <Option value='time'>Time</Option>
                <Option value='date'>Date</Option>
              </Select>
            </Form.Item>
          </Row>
          <Row style={{ marginLeft: '82px' }}>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Confirm
              </Button>
            </Form.Item>
            <Form.Item style={{ marginLeft: '20px' }}>
              <Button onClick={handleClose} type='primary'>
                Cancel
              </Button>
            </Form.Item>
          </Row>
        </Form>
      ) : null}
      <Row style={{ margin: ' 20px 0' }}>
        <Button
          disabled={disabled}
          onClick={() => handleAction('addField')}
          type='primary'
        >
          Add Field
        </Button>
        {inputFields.length > 0 ? (
          <Button
            disabled={disabled}
            onClick={() => handleAction('addFieldAtHead')}
            style={{ marginLeft: '20px' }}
            type='primary'
          >
            Add Field Head
          </Button>
        ) : null}
      </Row>
    </div>
  );
}

export default withDynamic(DynamicForm);
