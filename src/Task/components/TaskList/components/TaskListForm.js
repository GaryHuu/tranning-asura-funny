import { Space, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

TaskListForm.propTypes = {};

function TaskListForm({ taskList, loading }) {
  const { Column } = Table;

  return (
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
  );
}

export default TaskListForm;
