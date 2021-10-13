import React from 'react';

import DayEdit from 'Task/components/DayEdit';
import TextEdit from 'Task/components/TextEdit';
import TimeFromTo from 'Task/components/TimeFromTo';

import { TYPEFIELDS } from './../../assets/constants/index';

function TaskDetailViewFieldItem(props) {
  const { name, label, type, disabled } = props;

  const propsField = {
    name,
    label,
    disabled,
  };

  let field;
  switch (type) {
    case TYPEFIELDS.TEXT:
      field = <TextEdit {...propsField} />;
      break;
    case TYPEFIELDS.DATE:
      field = <DayEdit {...propsField} />;
      break;
    case TYPEFIELDS.TIMEFROMTO:
      field = <TimeFromTo {...propsField} />;
      break;
    default:
      break;
  }

  return <React.Fragment>{field}</React.Fragment>;
}

export default TaskDetailViewFieldItem;
