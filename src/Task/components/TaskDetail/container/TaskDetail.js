import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

import { api } from 'api';

import TaskDetailView from '../components/TaskDetailView';

import '../assets/styles.scss';

const MODE = {
  DISABLED: 'DISABLED',
  EDIT: 'EDIT',
};

function TaskDetail() {
  const {
    params: { id },
  } = useRouteMatch();

  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(MODE.DISABLED);

  const [task, setTask] = useState({});
  const [fields, setFields] = useState([]);
  const [infoFieldList, setInfoFieldList] = useState([]);

  console.log(mode);

  const setFieldsByTask = useCallback(
    (task) => {
      let newFields = [];
      infoFieldList.forEach((infoField) => {
        let newInfoField = {
          name: [infoField.name],
          value: task[infoField.name],
        };

        if (infoField.type === 'date') {
          newInfoField = {
            name: [infoField.name],
            value: moment(task[infoField.name], 'DD/MM/YYYY'),
          };
        }

        if (infoField.type === 'time from to') {
          newInfoField = {
            name: [infoField.name],
            value: [
              moment(task[infoField.name]?.startTime, 'HH:mm:ss'),
              moment(task[infoField.name]?.finishTime, 'HH:mm:ss'),
            ],
          };
        }

        newFields.push(newInfoField);
      });

      setFields(newFields);
    },
    [infoFieldList]
  );

  const handleToggleMode = () => {
    if (mode === MODE.DISABLED) {
      setMode(MODE.EDIT);
      return;
    }
    setMode(MODE.DISABLED);
  };

  const getNameFieldTypeFromTo = () => {
    const infoFieldTypeFromTo = infoFieldList.filter((field) => {
      return field.type === 'time from to';
    });
    return infoFieldTypeFromTo.map((field) => field.name);
  };

  const getNameFieldTypeDate = () => {
    const infoFieldTypeFromTo = infoFieldList.filter((field) => {
      return field.type === 'date';
    });
    return infoFieldTypeFromTo.map((field) => field.name);
  };

  const handleSubmit = (newTask) => {
    let newData = {
      ...task,
      ...newTask,
    };

    const infoFieldTypeFromTo = getNameFieldTypeFromTo();
    infoFieldTypeFromTo.forEach((field) => {
      const startTime = new Date(newTask[field][0]._d).toLocaleTimeString();
      const finishTime = new Date(newTask[field][1]._d).toLocaleTimeString();
      newData = {
        ...newData,
        [field]: {
          startTime,
          finishTime,
        },
      };
    });

    const infoFieldTypeDate = getNameFieldTypeDate();
    infoFieldTypeDate.forEach((field) => {
      const date = new Date(newTask[field]._d).toLocaleDateString();
      newData = {
        ...newData,
        [field]: date,
      };
    });

    setLoading(true);
    (async () => {
      try {
        const result = await api.editByID(parseInt(id), newData);
        setFieldsByTask(result);
        setTask(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
    setMode(MODE.DISABLED);
  };

  const formatNewFieldData = (newInfoFiled) => {
    if (newInfoFiled.type === 'text')
      return {
        [newInfoFiled.name]: '',
      };

    if (newInfoFiled.type === 'date')
      return {
        [newInfoFiled.name]: new Date().toLocaleDateString(),
      };

    if (newInfoFiled.type === 'time from to')
      return {
        [newInfoFiled.name]: {
          startTime: new Date().toLocaleTimeString(),
          finishTime: new Date().toLocaleTimeString(),
        },
      };
  };

  const handleOnAddField = (newInfoFiled) => {
    const newDataField = formatNewFieldData(newInfoFiled);
    // console.log(newDataField);

    (async () => {
      try {
        const result = await api.editByID(parseInt(id), newDataField);
        setFieldsByTask(result);
        setTask(result);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const result = await api.addNewField(parseInt(id), newInfoFiled);
        setInfoFieldList(result);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleOnAddFieldAfterIndex = (newInfoFiled, index) => {
    const newDateField = formatNewFieldData(newInfoFiled);

    (async () => {
      try {
        const result = await api.editByID(parseInt(id), newDateField);
        setFieldsByTask(result);
        setTask(result);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const result = await api.addNewFieldAfter(
          parseInt(id),
          newInfoFiled,
          index
        );
        setInfoFieldList(result);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleRemoveField = (name) => {
    console.log('before remove: ', mode);
    (async () => {
      try {
        const result = await api.editByID(parseInt(id), name);
        setFieldsByTask(result);
        setTask(result);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const result = await api.deleteField(parseInt(id), name);
        setInfoFieldList(result);
        console.log('on remove: ', mode);
      } catch (error) {
        console.log(error);
      }
    })();
    console.log('after remove: ', mode);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     try {
  //       const result = await api.getByID(parseInt(id));
  //       setFieldsByTask(result);
  //       setTask(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [id, setFieldsByTask]);

  useEffect(() => {
    setMode(MODE.DISABLED);
    setLoading(true);
    (async () => {
      try {
        const result = await api.getByID(parseInt(id));
        setFieldsByTask(result);
        setTask(result);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const result = await api.getInfoFields(parseInt(id));
        setInfoFieldList(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <TaskDetailView
      onAddField={handleOnAddField}
      onAddFieldAfterIndex={handleOnAddFieldAfterIndex}
      onSubmit={handleSubmit}
      disabled={mode === MODE.DISABLED}
      onSetModeEdit={handleToggleMode}
      loading={loading}
      fields={fields}
      infoFieldList={infoFieldList}
      onRemoveFiled={handleRemoveField}
    />
  );
}

export default TaskDetail;
