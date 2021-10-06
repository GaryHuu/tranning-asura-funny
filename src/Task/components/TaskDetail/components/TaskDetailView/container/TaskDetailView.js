import { Button, Form, Spin } from 'antd';
import React, { useState } from 'react';

import NewFieldsInfo from '../../NewFieldsInfo';
import TaskDetailViewFieldItem from '../components/TaskDetailViewFieldItem';

function TaskDetailView(props) {
  const {
    onAddFieldAfterIndex,
    onAddField,
    onSubmit,
    fields,
    disabled,
    infoFieldList,
    loading,
    onSetModeEdit,
    onRemoveFiled,
  } = props;

  const [isShowNewFiledsInfo, setIsShowNewFiledsInfo] = useState(false);

  const handleButtonAddSameFieldClick = (type, label, index) => {
    const newInfoFiled = {
      type,
      label,
      name: label,
    };

    onAddFieldAfterIndex(newInfoFiled, index);
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
          {/* Loading... */}
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
              {infoFieldList.map((info, idx) => (
                <TaskDetailViewFieldItem
                  key={info.name + info.label}
                  disabled={disabled}
                  name={info.name}
                  label={info.label}
                  index={idx}
                  type={info.type}
                  onItemClick={handleButtonAddSameFieldClick}
                  onRemoveFiled={onRemoveFiled}
                />
              ))}

              {disabled || (
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
                type='primary'
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
