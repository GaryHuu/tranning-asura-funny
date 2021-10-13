import { Input, Row, Typography } from "antd";
import React from "react";
function InputText({ name, disabled, label, value, onChange }) {
    return (
        <Row style={{ margin: "10px 0" }}>
            <Typography.Text>{label}</Typography.Text>
            <Input
                disabled={disabled}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Row>
    );
}

export default InputText;
