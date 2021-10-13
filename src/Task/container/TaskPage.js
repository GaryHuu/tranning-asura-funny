import React from 'react';

import TaskListForm from '../components/TaskList';

import '../assets/styles.scss';

function TaskPage() {
  return (
    <div className='task-list'>
      <TaskListForm />
    </div>
  );
}

export default TaskPage;
