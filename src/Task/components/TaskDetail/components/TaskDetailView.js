import { Button, Form, Spin } from 'antd';
import React from 'react';
import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';

function TaskDetailView(props) {
  const { onSubmit, fields, disabled, listInfo, loading, onSetModeEdit } =
    props;

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

    if (info.type === 'day')
      return (
        <DayEdit
          key={info.name + info.label}
          disabled={disabled}
          name={info.name}
          label={info.label}
        />
      );
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
              {listInfo.map((info) => handleSelectInfoType(info))}
              {disabled ? null : (
                <Button htmlType='submit' type='primary'>
                  Submit
                </Button>
              )}
            </Form>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetailView;
