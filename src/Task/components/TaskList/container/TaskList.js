import React, { useEffect, useState } from 'react';

import { api } from 'api';

import TaskListForm from '../components/TaskListForm';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getAll();
        setTaskList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className='title'>Danh sách công việc</div>
      <TaskListForm taskList={taskList} loading={loading} />
    </>
  );
}

export default TaskList;
