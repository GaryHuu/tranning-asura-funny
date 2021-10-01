import { Button } from 'antd';
import React from 'react';

function ButtonConfirm(props) {
  const { onClick } = props;
  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };
  return (
    <Button onClick={handleClick} type='primary'>
      Confirm
    </Button>
  );
}

export default ButtonConfirm;
