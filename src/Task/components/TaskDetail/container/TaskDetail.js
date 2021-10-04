import { Button, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';

import { api } from 'api';
import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';

import TimeFromToForm from '../components/TimeFromToForm';

import '../assets/styles.scss';

const MODE = {
  DISABLED: 'DISABLED',
  EDIT: 'EDIT',
};

function TaskDetail() {
  const {
    params: { id },
  } = useRouteMatch();

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(MODE.DISABLED);

  const listInfo = useMemo(() => {
    return [
      {
        type: 'text',
        name: 'fullName',
        label: 'Name',
        value: task.fullName,
      },
      {
        type: 'day',
        name: 'dayOfBirth',
        label: 'Day of birth',
        day: task.dayOfBirth,
      },
      {
        type: 'text',
        name: 'location',
        label: 'Location',
        value: task.location,
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone',
        value: task.phone,
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        value: task.email,
      },
      {
        type: 'text',
        name: 'currentJob',
        label: 'Current Job',
        value: task.currentJob,
      },
      {
        type: 'text',
        name: 'experience',
        label: 'Experience',
        value: task.experience,
      },
      {
        type: 'text',
        name: 'note',
        label: 'Note',
        value: task.note,
      },
      {
        type: 'text',
        name: 'idCard',
        label: 'ID Card',
        value: task.idCard,
      },
      {
        type: 'from to',
        name: null,
        label: 'Work Time',
        startTime: task.startTime,
        finishTime: task.finishTime,
      },
    ];
  }, [task]);

  const handleEdit = (value) => {
    const newValue = {
      ...task,
      ...value,
    };
    setTask(newValue);
  };

  const handleButtonEditClick = () => {
    if (mode === MODE.EDIT) {
      setLoading(true);
      (async () => {
        try {
          const result = await api.editByID(parseInt(id), task);
          setTask(result);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
      setMode(MODE.DISABLED);
      return;
    }

    setMode(MODE.EDIT);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.getByID(parseInt(id));
        console.log(result);
        setTask(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleSelectInfoType = (info) => {
    if (info.type === 'text')
      return (
        <TextEdit
          disabled={mode === MODE.DISABLED}
          key={info.name + info.label}
          onEdit={handleEdit}
          name={info.name}
          label={info.label}
          value={info.value}
        />
      );

    if (info.type === 'day')
      return (
        <DayEdit
          disabled={mode === MODE.DISABLED}
          key={info.name + info.label}
          name={info.name}
          label={info.label}
          day={task.dayOfBirth}
          onEdit={handleEdit}
        />
      );
    if (info.type === 'from to')
      return (
        <TimeFromToForm
          disabled={mode === MODE.DISABLED}
          key={info.label}
          formatStartFinish={true}
          label={info.label}
          startTime={task.startTime}
          finishTime={task.finishTime}
          onEdit={handleEdit}
        />
      );
  };

  return (
    <div className='task-detail'>
      <div className='title-info'>Thông tin chi tiết</div>
      {loading ? (
        <>
          Loading...
          <Spin size='small' />
        </>
      ) : (
        <>
          <Button onClick={handleButtonEditClick} type='primary'>
            {mode === MODE.DISABLED ? 'EDIT' : 'SAVE'}
          </Button>
          <div className='text-list'>
            {listInfo.map((info) => handleSelectInfoType(info))}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetail;
