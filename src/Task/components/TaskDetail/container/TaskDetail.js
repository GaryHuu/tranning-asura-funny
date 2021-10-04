import { api } from 'api';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';
import '../assets/styles.scss';
import TaskDetailView from '../components/TaskDetailView';

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
  const [fields, setFields] = useState([]);

  const setValueFileds = (task) => {
    setFields([
      {
        name: ['fullName'],
        value: task.fullName,
      },
      {
        name: ['dayOfBirth'],
        value: moment(task.dayOfBirth, 'DD/MM/YYYY'),
      },
      {
        name: ['location'],
        value: task.location,
      },
      {
        name: ['phone'],
        value: task.phone,
      },
      {
        name: ['email'],
        value: task.email,
      },
      {
        name: ['currentJob'],
        value: task.currentJob,
      },
      {
        name: ['experience'],
        value: task.experience,
      },
      {
        name: ['note'],
        value: task.note,
      },
      {
        name: ['idCard'],
        value: task.idCard,
      },
    ]);
  };

  useEffect(() => {
    setValueFileds(task);
  }, [task]);

  const listInfo = useMemo(() => {
    return [
      {
        type: 'text',
        name: 'fullName',
        label: 'Name',
      },
      {
        type: 'day',
        name: 'dayOfBirth',
        label: 'Day of birth',
      },
      {
        type: 'text',
        name: 'location',
        label: 'Location',
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone',
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
      },
      {
        type: 'text',
        name: 'currentJob',
        label: 'Current Job',
      },
      {
        type: 'text',
        name: 'experience',
        label: 'Experience',
      },
      {
        type: 'text',
        name: 'note',
        label: 'Note',
      },
      {
        type: 'text',
        name: 'idCard',
        label: 'ID Card',
      },
      // {
      //   type: 'from to',
      //   name: null,
      //   label: 'Work Time',
      //   startTime: task.startTime,
      //   finishTime: task.finishTime,
      // },
    ];
  }, [task]);

  const handleToggleMode = () => {
    if (mode === MODE.DISABLED) {
      setMode(MODE.EDIT);
      return;
    }
    setMode(MODE.DISABLED);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await api.getByID(parseInt(id));
        setTask(result);

        setValueFileds(result);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleSubmit = (values) => {
    const dayOfBirth = new Date(values.dayOfBirth._d).toLocaleDateString();
    const newValue = {
      ...task,
      ...values,
      dayOfBirth,
    };

    setLoading(true);

    (async () => {
      try {
        const result = await api.editByID(parseInt(id), newValue);
        setTask(result);
        console.log(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

    handleToggleMode();
  };

  return (
    <TaskDetailView
      onSubmit={handleSubmit}
      disabled={mode === MODE.DISABLED}
      onSetModeEdit={handleToggleMode}
      loading={loading}
      fields={fields}
      listInfo={listInfo}
    />
  );
}

export default TaskDetail;
