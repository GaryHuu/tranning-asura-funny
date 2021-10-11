import { api } from 'api';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import '../assets/styles.scss';
import { TYPEFIELDS } from '../components/assets/constants';

const MODE = {
  DISABLED: 'DISABLED',
  EDIT: 'EDIT',
};

const FORMATTYPE = {
  DATE: 'DD/MM/YYYY',
  TIME: 'HH:mm:ss',
};

const DEFAULTVALUE = {
  TEXT: '',
  DAY: new Date().toLocaleDateString(),
  TIMEFROMTO: {
    STARTTIME: new Date().toLocaleTimeString(),
    FINISHTIME: new Date().toLocaleTimeString(),
  },
};

function withTaskDetail(Component) {
  return function (props) {
    const {
      params: { id },
    } = useRouteMatch();

    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState(MODE.DISABLED);

    const [task, setTask] = useState({});
    const [fields, setFields] = useState([]);
    const [infoFieldList, setInfoFieldList] = useState([]);

    const handleToggleMode = () => {
      if (mode === MODE.DISABLED) {
        setMode(MODE.EDIT);
        return;
      }
      setMode(MODE.DISABLED);
    };

    const getNameFieldTypeFromTo = () => {
      const infoFieldTypeFromTo = infoFieldList.filter((field) => {
        return field.type === TYPEFIELDS.TIMEFROMTO;
      });
      return infoFieldTypeFromTo.map((field) => field.name);
    };

    const getNameFieldTypeDate = () => {
      const infoFieldTypeFromTo = infoFieldList.filter((field) => {
        return field.type === TYPEFIELDS.DATE;
      });
      return infoFieldTypeFromTo.map((field) => field.name);
    };

    const formatNewFieldData = (newInfoFiled) => {
      if (newInfoFiled.type === TYPEFIELDS.TEXT)
        return {
          [newInfoFiled.name]: DEFAULTVALUE.TEXT,
        };

      if (newInfoFiled.type === TYPEFIELDS.DATE)
        return {
          [newInfoFiled.name]: DEFAULTVALUE.DAY,
        };

      if (newInfoFiled.type === TYPEFIELDS.TIMEFROMTO)
        return {
          [newInfoFiled.name]: {
            startTime: DEFAULTVALUE.TIMEFROMTO.STARTTIME,
            finishTime: DEFAULTVALUE.TIMEFROMTO.FINISHTIME,
          },
        };
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
          setTask(result);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
      setMode(MODE.DISABLED);
    };

    const handleOnAddField = (newInfoFiled) => {
      const newDataField = formatNewFieldData(newInfoFiled);
      (async () => {
        try {
          const result = await api.editByID(parseInt(id), newDataField);
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
      (async () => {
        try {
          const result = await api.editByID(parseInt(id), name);
          setTask(result);
        } catch (error) {
          console.log(error);
        }
      })();
      (async () => {
        try {
          const result = await api.deleteField(parseInt(id), name);
          setInfoFieldList(result);
        } catch (error) {
          console.log(error);
        }
      })();
    };

    useEffect(() => {
      setMode(MODE.DISABLED);
      setLoading(true);
      (async () => {
        try {
          const result = await api.getByID(parseInt(id));
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
    }, [id]);

    const setFieldsByTask = useCallback(() => {
      let newFields = [];
      infoFieldList.forEach((infoField) => {
        let newInfoField = {};

        switch (infoField.type) {
          case TYPEFIELDS.TEXT:
            newInfoField = {
              name: [infoField.name],
              value: task[infoField.name],
            };
            break;

          case TYPEFIELDS.DATE:
            newInfoField = {
              name: [infoField.name],
              value: moment(task[infoField.name], FORMATTYPE.DATE),
            };
            break;

          case TYPEFIELDS.TIMEFROMTO:
            newInfoField = {
              name: [infoField.name],
              value: [
                moment(task[infoField.name]?.startTime, FORMATTYPE.TIME),
                moment(task[infoField.name]?.finishTime, FORMATTYPE.TIME),
              ],
            };
            break;

          default:
            break;
        }

        newFields.push(newInfoField);
      });

      setFields(newFields);
    }, [infoFieldList, task]);

    useEffect(() => {
      setFieldsByTask();
    }, [setFieldsByTask]);

    return (
      <Component
        onAddField={handleOnAddField}
        onAddFieldAfterIndex={handleOnAddFieldAfterIndex}
        onSubmit={handleSubmit}
        disabled={mode === MODE.DISABLED}
        onSetModeEdit={handleToggleMode}
        loading={loading}
        fields={fields}
        infoFieldList={infoFieldList}
        onRemoveFiled={handleRemoveField}
        isEmpty={fields.length === 0}
        {...props}
      />
    );
  };
}

export default withTaskDetail;
