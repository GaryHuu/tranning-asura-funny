import { TimePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ButtonConfirm from 'Task/components/ButtonConfirm';

TimeFromToForm.propTypes = {
  onEdit: PropTypes.func,
};

function TimeFromToForm(props) {
  const { formatStartFinish, startTime, finishTime, label, onEdit, disabled } =
    props;
  const [isChange, setIsChange] = useState(false);
  const [startTimeEdit, setStartTimeEdit] = useState(startTime);
  const [finishTimeEdit, setFinishTimeEdit] = useState(finishTime);

  const handleConfirm = () => {
    let value = {
      from: startTimeEdit,
      to: finishTimeEdit,
    };

    if (formatStartFinish) {
      value = {
        startTime: startTimeEdit,
        finishTime: finishTimeEdit,
      };
    }

    setIsChange(false);
    onEdit(value);
  };

  const handleOnStartTimeChange = (time, timeString) => {
    setStartTimeEdit(timeString);
    setIsChange(true);
  };

  const handleOnFinishTimeChange = (time, timeString) => {
    setFinishTimeEdit(timeString);
    setIsChange(true);
  };

  return (
    <div className='wrap'>
      {label && <label>{label}:</label>}
      <div className='time-pick'>
        <span>Time From</span>
        <TimePicker
          onChange={handleOnStartTimeChange}
          disabled={disabled}
          value={moment(startTimeEdit, 'HH:mm:ss')}
        />
        <span>Time Finish</span>
        <TimePicker
          onChange={handleOnFinishTimeChange}
          disabled={disabled}
          value={moment(finishTimeEdit, 'HH:mm:ss')}
        />
      </div>
      {isChange && <ButtonConfirm onClick={handleConfirm} />}
    </div>
  );
}

TimeFromToForm.defaultProps = {
  onEdit: () => {},
};

export default TimeFromToForm;
