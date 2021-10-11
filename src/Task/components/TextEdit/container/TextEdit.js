import { PropTypes } from 'prop-types';
import React from 'react';

import TextEditForm from '../components/TextEditForm';

TextEdit.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

function TextEdit(props) {
  return <TextEditForm {...props} />;
}
export default TextEdit;
