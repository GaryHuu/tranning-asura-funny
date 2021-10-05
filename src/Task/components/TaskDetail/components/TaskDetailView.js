import { Button, Form, Input, Space, Spin } from 'antd';
import React, { useState } from 'react';

import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';
import TimeFromTo from 'Task/components/TimeFromTo';

import NewFieldsInfo from './NewFieldsInfo';

function TaskDetailView(props) {
  const {
    onAddField,
    onSubmit,
    fields,
    disabled,
    infoFieldList,
    loading,
    onSetModeEdit,
  } = props;

  // console.log(infoFieldList);

  const [isShowNewFiledsInfo, setIsShowNewFiledsInfo] = useState(false);

  const handleSelectInfoType = (info) => {
    if (info.type === 'text')
      return (
        <TextEdit
          key={info.name + info.label}
          disabled={disabled}
          name={info.name}
          label={info.label}
        />
      );

    if (info.type === 'date')
      return (
        <DayEdit
          key={info.name + info.label}
          disabled={disabled}
          name={info.name}
          label={info.label}
        />
      );
    if (info.type === 'time from to')
      return (
        <TimeFromTo
          key={info.name + info.label}
          disabled={disabled}
          name={info.name}
          label={info.label}
        />
      );
  };

  const handleConfirmNewFieldsInfo = (value) => {
    const newInfoFiled = {
      ...value,
      name: value.label,
    };
    // console.log(newInfoFiled);

    onAddField(newInfoFiled);

    setIsShowNewFiledsInfo(false);
  };

  const handleAddNewField = () => {
    setIsShowNewFiledsInfo(true);
  };

  return (
    <div className='task-detail'>
      <div className='title-info'>Thông tin chi tiết</div>
      {loading ? (
        <>
          Loading...
          <Spin size='small' />
        </>
      ) : (
        <>
          <Button
            style={{ margin: '10px 0' }}
            onClick={() => {
              onSetModeEdit();
            }}
            type='primary'
          >
            {disabled ? 'Edit' : 'Cancel'}
          </Button>

          <div className='text-list'>
            <Form
              fields={fields}
              name='global_state'
              layout='vertical'
              onFinish={onSubmit}
            >
              {infoFieldList.map((info) => handleSelectInfoType(info))}

              {disabled ? null : (
                <Button
                  style={{ display: 'block', marginTop: '10px' }}
                  htmlType='submit'
                  type='primary'
                >
                  Submit
                </Button>
              )}
            </Form>
            {disabled || (
              <Button
                style={{ display: 'block', margin: '10px 0' }}
                type='dashed'
                onClick={handleAddNewField}
              >
                Add new field
              </Button>
            )}

            {isShowNewFiledsInfo && (
              <NewFieldsInfo onConfirm={handleConfirmNewFieldsInfo} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetailView;
