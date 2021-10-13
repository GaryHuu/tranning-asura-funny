import React from "react";
import InputDate from "../components/InputDate";
import PropTypes from "prop-types";
function InputDateContainer({ name, disabled, label, value, onChange }) {
    return (
        <InputDate
            name={name}
            onChange={onChange}
            disabled={disabled}
            value={value}
            label={label}
        />
    );
}

export default InputDateContainer;

InputDateContainer.propTypes = {
    name: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};
