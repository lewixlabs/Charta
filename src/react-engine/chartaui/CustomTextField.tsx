import CSS from "csstype";
import React from "react";
import { TextInput } from "react-desktop/macOs";

const textFieldStyle: CSS.Properties = {
    display: "inline-block",
};

interface ITextFieldProps {
    label?: string;
    defaulText?: string;
}

export const CustomTextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
    return (
        <div style={textFieldStyle}>
            <TextInput
                width="45"
                size="15"
                maxLength="4"
                label={props.label}
                rounded="4"
                // placeholder="My Input"
                defaultValue={props.defaulText}
                // onChange={this.handleChange}
                marginLeft="10"
                marginRight="10"
            />
        </div>

    );
};