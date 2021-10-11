import { PropTypes } from 'prop-types';
import React from 'react';

import DayEditForm from '../components/DayEditForm';

DayEdit.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
};

function DayEdit(props) {
  return <DayEditForm {...props} />;
}

export default DayEdit;
