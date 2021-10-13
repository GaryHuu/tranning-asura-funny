import React from "react";
import RangePickerInput from "../components/RangePickerInput";

function RangePickerInputContainer({ name, label, disabled, value, onChange }) {
    return (
        <RangePickerInput
            name={name}
            label={label}
            value={value}
            disabled={disabled}
            onChange={onChange}
        />
    );
}

export default RangePickerInputContainer;
