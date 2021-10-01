import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import TaskPage from './Task';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={TaskPage} />
      </Switch>
    </>
  );
}

export default App;
