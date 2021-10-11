import React, { useEffect, useState } from 'react';

import { api } from 'api';

function withTaskList(Component) {
  return function (props) {
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

    return <Component taskList={taskList} loading={loading} {...props} />;
  };
}

export default withTaskList;
