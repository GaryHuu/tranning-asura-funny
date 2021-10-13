import { Space, Table } from 'antd';
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import withTaskList from '../container/withTaskList';

TaskListForm.propTypes = {};

function TaskListForm(props) {
  const { taskList, loading } = props;
  const { Column } = Table;
  return (
    <>
      <div className='title'>Danh sách công việc</div>
      <Table dataSource={taskList} pagination={false} loading={loading}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title='Job Title' dataIndex='jobTitle' key='jobTitle' />
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
    </>
  );
}

export default withTaskList(TaskListForm);
