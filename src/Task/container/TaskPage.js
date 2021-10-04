import React from 'react';

import TaskList from '../components/TaskList';

import '../assets/styles.scss';

function TaskPage() {
  return (
    <div className='task-list'>
      <TaskList />
    </div>
  );
}

export default TaskPage;
