import { TimePicker } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { api } from 'api';
import TextEdit from 'Task/components/TextEdit';

import '../assets/styles.scss';

function TaskItem({ task }) {
  const { time, id, jobTitle } = task;
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleItemClick = () => {
    history.push(`${url}detail/${id}`);
  };

  const handleOnEdit = async (jobTitle) => {
    try {
      const result = await api.editByID(id, {
        jobTitle,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={handleItemClick} className='task-item'>
      <Text>Số Thứ Tự: &nbsp; {id}</Text>
      <TextEdit onEdit={handleOnEdit} value={jobTitle} />
      <TimePicker disabled value={moment(time, 'HH:mm:ss')} />
    </div>
  );
}

export default TaskItem;
