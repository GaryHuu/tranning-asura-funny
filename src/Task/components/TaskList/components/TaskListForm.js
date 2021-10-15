import { Space, Table, Button } from 'antd';
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import withTaskList from '../container/withTaskList';

TaskListForm.propTypes = {};

function TaskListForm(props) {
  const { taskList, isLoading } = props;
  const { Column } = Table;
  return (
    <>
      <div className='title'>Danh sách công việc</div>
      <Table dataSource={taskList} pagination={false} loading={isLoading}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title='Job Title' dataIndex='taskName' key='taskName' />
        <Column
          title='Action'
          key='action'
          render={(item) => (
            <Space size='middle'>
              <Link to={`/detail/${item.id}`}>Detail</Link>
            </Space>
          )}
        />
      </Table>

      <Button
        style={{
          textAlign: 'center',
          margin: '30px 60px',
        }}
        type='dashed'
      >
        <Link to='/dynamic'>Dynamic Form</Link>
      </Button>
    </>
  );
}

export default withTaskList(TaskListForm);
