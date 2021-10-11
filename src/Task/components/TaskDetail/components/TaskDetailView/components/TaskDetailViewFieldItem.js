import { Button, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';

import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';
import TimeFromTo from 'Task/components/TimeFromTo';

import { TYPEFIELDS } from '../../assets/constants';

function TaskDetailViewFieldItem(props) {
  const { disabled, name, label, type, onItemClick, index, onRemoveFiled } =
    props;

  const [isShowLabel, setIsShowLabel] = useState(false);
  const [valueLabel, setValueLabel] = useState('');

  const handleOnRemoveField = () => {
    onRemoveFiled(name);
  };

  const propsField = {
    onRemove: handleOnRemoveField,
    disabled,
    name,
    label,
  };

  let field;
  switch (type) {
    case TYPEFIELDS.TEXT:
      field = <TextEdit {...propsField} />;
      break;
    case TYPEFIELDS.DATE:
      field = <DayEdit {...propsField} />;
      break;
    case TYPEFIELDS.TIMEFROMTO:
      field = <TimeFromTo {...propsField} />;
      break;
    default:
      break;
  }

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
