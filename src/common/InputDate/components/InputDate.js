import { DatePicker, Row, Typography } from "antd";
import moment from "moment";
import React from "react";

function InputDate({ label, name, disabled, value, onChange }) {
    return (
        <Row style={{ margin: "10px 0" }}>
            <Typography.Text>{label}</Typography.Text>
            <DatePicker
                style={{ width: "100%" }}
                disabled={disabled}
                value={moment(value, "DD/MM/YYYY")}
                format="DD/MM/YYYY"
                name={name}
                onChange={onChange}
            />
        </Row>
    );
}

export default InputDate;
