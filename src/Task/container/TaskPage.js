import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import TaskDetail from '../components/TaskDetail';
import TaskList from '../components/TaskList';
import '../assets/styles.scss';

function TaskPage() {
  const match = useRouteMatch();
  return (
    <div className='container'>
      <div className='task-list'>
        <TaskList />
      </div>
      <Switch>
        <Route path={`${match.url}detail/:id`} exact component={TaskDetail} />
      </Switch>
    </div>
  );
}

export default TaskPage;
