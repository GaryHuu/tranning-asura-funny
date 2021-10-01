import { Button, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';

import ButtonConfirm from '../../ButtonConfirm';
import DayPicker from '../../DayEdit/components/DayPicker';
import DayEdit from '../../DayEdit/container/DayEdit';
import { api } from './../../../../api';
import TextEdit from './../../TextEdit';

import '../assets/styles.scss';

function TaskDetail() {
  const {
    params: { id },
  } = useRouteMatch();

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const listInfo = useMemo(() => {
    return [
      {
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
        name: 'location',
        label: 'Location',
        value: task.location,
      },
      {
        name: 'phone',
        label: 'Phone',
        value: task.phone,
      },
      {
        name: 'email',
        label: 'Email',
        value: task.email,
      },
      {
        name: 'currentJob',
        label: 'Current Job',
        value: task.currentJob,
      },
      {
        name: 'experience',
        label: 'Experience',
        value: task.experience,
      },
      {
        name: 'note',
        label: 'Note',
        value: task.note,
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
    if (!disabled) {
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
    }
    setDisabled(!disabled);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.getByID(parseInt(id));
        setTask(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

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
            {disabled ? 'EDIT' : 'SAVE'}
          </Button>
          <div className='text-list'>
            {listInfo.map((info) => {
              if (info.type !== 'day')
                return (
                  <TextEdit
                    disabled={disabled}
                    key={Math.random()}
                    onEdit={handleEdit}
                    name={info.name}
                    label={info.label}
                    value={info.value}
                  />
                );
              return (
                <DayEdit
                  disabled={disabled}
                  key={Math.random()}
                  name='dayOfBirth'
                  label='Day of birth'
                  day={task.dayOfBirth}
                  onEdit={handleEdit}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetail;
