import { Row, TimePicker, Typography } from "antd";
import moment from "moment";
import React from "react";

function InputTime({ label, name, disabled, value, onChange }) {
    return (
        <Row style={{ flexDirection: "column", margin: "10px 0" }}>
            <Typography.Text>{label}</Typography.Text>
            <TimePicker
                name={name}
                disabled={disabled}
                value={moment(value, "HH:mm:ss")}
                onChange={onChange}
            />
        </Row>
    );
}

export default InputTime;
