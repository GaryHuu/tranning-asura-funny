import { Row, TimePicker, Typography } from "antd";
import moment from "moment";
import React from "react";
function RangePickerInput({ name, label, disabled, value, onChange }) {
    // console.log(value);
    return (
        <Row style={{ flexDirection: "column", margin: "10px 0" }}>
            <Typography.Text>{label}</Typography.Text>
            <TimePicker.RangePicker
                name={[name[0], name[1]]}
                disabled={disabled}
                value={[
                    moment(value[0], "HH:mm:ss"),
                    moment(value[1], "HH:mm:ss"),
                ]}
                format="HH:mm:ss"
                onChange={onChange}
            />
        </Row>
    );
}

export default RangePickerInput;
