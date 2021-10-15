import { Row } from 'antd';
import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import DynamicForm from 'Task/components/Dynamic';

import TaskDetail from 'Task/components/TaskDetail';

import TaskPage from './Task';

function App() {
  return (
    <Row>
      <TaskPage />
      <Switch>
        <Route path={'/detail/:id'} exact component={TaskDetail} />
        <Route path={'/dynamic'} exact component={DynamicForm} />
      </Switch>
    </Row>
  );
}

export default App;
