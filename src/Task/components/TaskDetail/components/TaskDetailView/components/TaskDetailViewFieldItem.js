import { MinusCircleOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';

import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';
import TimeFromTo from 'Task/components/TimeFromTo';

function TaskDetailViewFieldItem(props) {
  const { disabled, name, label, type, onItemClick, index, onRemoveFiled } =
    props;

  const handleOnRemoveField = () => {
    onRemoveFiled(name);
  };

  let field;
  if (type === 'text') {
    field = (
      <TextEdit
        onRemove={handleOnRemoveField}
        disabled={disabled}
        name={name}
        label={label}
      />
    );
  } else if (type === 'date') {
    field = (
      <DayEdit
        onRemove={handleOnRemoveField}
        disabled={disabled}
        name={name}
        label={label}
      />
    );
  } else if (type === 'time from to') {
    field = (
      <TimeFromTo
        onRemove={handleOnRemoveField}
        disabled={disabled}
        name={name}
        label={label}
      />
    );
  }
  const [isShowLabel, setIsShowLabel] = useState(false);
  const [valueLabel, setValueLabel] = useState('');

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setValueLabel(newValue);
  };

  const handleAddFieldClick = () => {
    if (!isShowLabel) {
      setIsShowLabel(true);
      return;
    }
    onItemClick(type, valueLabel, index);
    setValueLabel('');
    setIsShowLabel(false);
  };

  const handleCancelClick = () => {
    setValueLabel('');
    setIsShowLabel(false);
  };

  return (
    <React.Fragment>
      {field}
      {disabled || (
        <Space>
          {isShowLabel && (
            <>
              <Typography
                style={{
                  height: '30px',
                  margin: '0 10px',
                  fontSize: '14px',
                }}
              >
                Label :
              </Typography>
              <Input
                style={{ margin: '-10px 0 10px' }}
                onChange={handleOnChange}
                value={valueLabel}
              />
              <Button
                onClick={handleCancelClick}
                type='dashed'
                style={{ margin: '-10px 0 10px' }}
              >
                Cancel
              </Button>
            </>
          )}
          <Button
            onClick={handleAddFieldClick}
            type='dashed'
            style={{ margin: '-10px 0 10px 10px' }}
          >
            {isShowLabel ? 'Confirm' : 'Add same fields here'}
          </Button>
        </Space>
      )}
    </React.Fragment>
  );
}

export default TaskDetailViewFieldItem;
