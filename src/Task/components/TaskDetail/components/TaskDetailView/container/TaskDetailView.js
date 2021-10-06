import { Button, Form, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

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
    isEmpty,
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

  useEffect(() => {
    setIsShowNewFiledsInfo(false);
  }, [fields]);

  return (
    <div className='task-detail'>
      <div className='title-info'>Thông tin chi tiết</div>
      {isEmpty && (
        <Typography style={{ fontSize: '16px', fontStyle: 'italic' }}>
          Chưa có thông tin, ấn Edit để thêm thông tin
        </Typography>
      )}
      {loading ? (
        <>
          {/* Loading... */}
          <Spin size='small' />
        </>
      ) : (
        <>
          <Button
            style={{ margin: '10px 0', width: '80px' }}
            onClick={() => {
              setIsShowNewFiledsInfo(false);
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
                  style={{ display: 'block', margin: '10px 0' }}
                  type='dashed'
                  htmlType='button'
                  onClick={handleAddNewField}
                >
                  Add new field
                </Button>
              )}
              {disabled || isEmpty || (
                <Button
                  style={{ display: 'block', margin: '10px 0' }}
                  htmlType='submit'
                  type='primary'
                >
                  Submit
                </Button>
              )}
            </Form>

            {isShowNewFiledsInfo && (
              <NewFieldsInfo
                onCancel={() => {
                  setIsShowNewFiledsInfo(false);
                }}
                onConfirm={handleConfirmNewFieldsInfo}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetailView;
