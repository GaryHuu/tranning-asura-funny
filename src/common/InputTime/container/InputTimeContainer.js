import React from "react";
import PropTypes from "prop-types";
import InputTime from "../components/InputTime";
function InputTimeContainer({ name, disabled, label, value, onChange }) {
    return (
        <InputTime
            name={name}
            disabled={disabled}
            label={label}
            value={value}
            onChange={onChange}
        />
    );
}

export default InputTimeContainer;

InputTimeContainer.propTypes = {
    name: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};
