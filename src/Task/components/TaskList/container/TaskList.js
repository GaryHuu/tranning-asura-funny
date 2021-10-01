import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { api } from './../../../../api';
import TaskItem from './../components/TaskItem/container/TaskItem';
import '../assets/styles.scss';
import { Spin } from 'antd';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getAll();
        console.log(data);
        setLoading(false);
        setTaskList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className='title'>Danh sách công việc</div>
      {loading ? (
        <div className='loading'>
          Loading...
          <Spin size='small' />
        </div>
      ) : (
        taskList.map((item) => <TaskItem key={item.id} task={item} />)
      )}
    </>
  );
}

export default TaskList;
